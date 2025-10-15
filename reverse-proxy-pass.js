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
const FALLBACK_URL = `www.couponcode2025.com/deal-cards/clickref=1101lBMJ4cbo&af_xp=custom&pid=partnerize_int&is_retargeting=true&af_click_lookback=30d&utm_content=1011l268954&utm_source=partnerize&utm_medium=affiliate&utm_campaign=asadkhan&utm_clickref=1101lBMJ4cbo&clickid=1101lBMJ4cbo&af_reengagement_window=30d&af_siteid=partnerize&utm_term=Coupon/Voucher||PC1|https://www.promocode2025.com/&c=Affiliate`;

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) return res.status(400).send("Missing id parameter");
    if (!/^\d+$/.test(String(id))) return res.status(400).send("Invalid id");

    // 1️⃣ Fetch the redirect URL from PromoDealCode
    const apiUrl = `${PROMO_API_BASE}/${encodeURIComponent(id)}?_fields=id,acf`;
    console.log(`[proxy] Fetching promo API: ${apiUrl}`);

    const destHost = new URL(redirectUrl).host;

    const promoResp = await axios.get(apiUrl, {
      timeout: 8000,
      headers: {
        Referer: SITE_B_ORIGIN,
        Origin: SITE_B_ORIGIN,
        Host: SITE_B_HOST,
        Accept: "application/json, text/plain, */*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    const redirectUrl =
      FALLBACK_URL || promoResp.data?.acf?.coupon_fields?.discount_link;

    if (!redirectUrl) {
      console.warn("[proxy] discount_link missing in promo response");
      return res.status(404).send("Redirect URL not found");
    }

    console.log(`[proxy] ID=${id} → Redirect to ${redirectUrl}`);

    res.setHeader("Referer", SITE_B_ORIGIN);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("X-Robots-Tag", "noindex, nofollow");

    return res.redirect(302, redirectUrl);
  } catch (err) {
    console.error("[proxy] Internal error:", err.message);
    if (!res.headersSent) res.status(500).send("Internal server error");
  }
});

app.listen(PORT, () => {
  console.log(`Reverse proxy server listening on http://0.0.0.0:${PORT}`);
});
