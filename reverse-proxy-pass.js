// reverse-proxy.js
import express from "express";
import axios from "axios";
import { URL } from "url";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// Configuration
const PROMO_API_BASE = "https://www.promodealcode.com/us/wp-json/wp/v2/coupon";
const SITE_B_ORIGIN = "https://www.promodealcode.com/";
const SITE_B_HOST = "www.promodealcode.com";

// Hop-by-hop headers not to forward
const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
]);

app.use(cors());

app.get("/out", async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) return res.status(400).send("Missing id parameter");
    if (!/^\d+$/.test(String(id))) return res.status(400).send("Invalid id");

    // 1️⃣ Fetch the redirect URL from PromoDealCode
    const apiUrl = `${PROMO_API_BASE}/${encodeURIComponent(id)}?_fields=id,acf`;
    console.log(`[proxy] Fetching promo API: ${apiUrl}`);

    const promoResp = await axios.get(apiUrl, {
      timeout: 8000,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; PromoProxy/1.0)",
        Referer: SITE_B_ORIGIN,
        Origin: SITE_B_ORIGIN,
        Host: SITE_B_HOST,
        Accept: "application/json, text/plain, */*",
      },
    });

    const redirectUrl = promoResp.data?.acf?.coupon_fields?.discount_link;
    if (!redirectUrl) {
      console.warn("[proxy] discount_link missing in promo response");
      return res.status(404).send("Redirect URL not found");
    }

    console.log(`[proxy] ID=${id} → Redirect to ${redirectUrl}`);
    return res
      .set("Referrer-Policy", "origin") // Only send your domain, not full URL
      .redirect(302, redirectUrl);
  } catch (err) {
    console.error("[proxy] Internal error:", err.message);
    if (!res.headersSent) res.status(500).send("Internal server error");
  }
});

app.listen(PORT, () => {
  console.log(`Reverse proxy server listening on http://0.0.0.0:${PORT}`);
});
