import express from "express";
import crypto from "crypto";
import axios from "axios";

const app = express();

// Configuration

const PROMO_API_BASE = "https://www.promodealcode.com/us/wp-json/wp/v2/coupon";
const SITE_B_ORIGIN = "https://www.promodealcode.com";
const SITE_B_REF = "promodealcode.com";
const FALLBACK_URL = `https://www.couponcode2025.com/deal-cards/?clickref=1101lBMJ4cbo&af_xp=custom&pid=partnerize_int&is_retargeting=true&af_click_lookback=30d&utm_content=1011l268954&utm_source=partnerize&utm_medium=affiliate&utm_campaign=asadkhan&utm_clickref=1101lBMJ4cbo&clickid=1101lBMJ4cbo&af_reengagement_window=30d&af_siteid=partnerize&utm_term=Coupon/Voucher||PC1|https://www.promocode2025.com/&c=Affiliate`;
const SITE_B_HOST = "www.promodealcode.com";

// In-memory store (use database in production)
const clicks = new Map();

// Helper function to validate URL
function isValidUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

// Helper function to sanitize URL for HTML injection
function sanitizeUrl(url) {
  return url.replace(/["'<>]/g, "");
}

app.get("/out-client", async (req, res) => {
  const { id } = req.query;

  // Validate input
  if (!id) {
    return res.status(400).send("Missing 'id' parameter");
  }

  // Generate unique click ID
  const clickId = crypto.randomBytes(16).toString("hex");

  let targetUrl = FALLBACK_URL;

  //   try {
  const apiUrl = `${PROMO_API_BASE}/${encodeURIComponent(id)}?_fields=id,acf`;
  console.log(`[${new Date().toISOString()}] Fetching: ${apiUrl}`);

  const promoResp = await axios.get(apiUrl, {
    timeout: 5000,
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; PromoProxy/1.0)",
      Referer: SITE_B_ORIGIN,
      Accept: "application/json",
    },
    validateStatus: (status) => status < 500,
  });

  // Extract redirect URL from response
  const discountLink =
    FALLBACK_URL || promoResp.data?.acf?.coupon_fields?.discount_link;

  // if (discountLink && isValidUrl(discountLink)) {
  targetUrl = discountLink;
  //   console.log(`[${clickId}] Valid discount link found: ${targetUrl}`);
  // } else {
  //   console.warn(
  //     `[${clickId}] No valid discount_link in response, using fallback`
  //   );
  // }
  //   } catch (error) {
  //     console.error(`[${clickId}] API fetch error:`, error.message);
  //   }

  clicks.set(clickId, {
    couponId: id,
    timestamp: Date.now(),
    ip: req.ip,
    userAgent: req.headers["user-agent"],
    referrer: SITE_B_REF,
    targetUrl: targetUrl,
    merchantUrl: targetUrl,
    source: SITE_B_REF,
    trafficSource: SITE_B_ORIGIN,
  });

  console.log(`[${clickId}] Click tracked, redirecting to: ${targetUrl}`);

  const safeUrl = sanitizeUrl(targetUrl);

  res.setHeader("Origin", SITE_B_ORIGIN);
  res.setHeader("Access-Control-Allow-Origin", SITE_B_ORIGIN);
  res.setHeader("Host", SITE_B_HOST);
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");

  res.send(`<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0;url=${safeUrl}">
    <style>
      body {
        display: none;
        font-family: system-ui, -apple-system, sans-serif;
        text-align: center;
        padding: 50px;
      }
    </style>
  </head>
  <body>
    <script>
      // Use location.replace to avoid adding to browser history
      (function() {
        try {
          window.location.replace('${safeUrl}');
        } catch(e) {
          // Fallback to standard navigation if replace fails
          //window.location.href = '${safeUrl}';
          console.log("Error",${safeUrl});
        }
      })();
    </script>
  </body>
  </html>`);
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`✓ Redirect server running on port ${PORT}`);
  console.log(`✓ Endpoints:`);
  console.log(`  GET  /out-client?id=123     - Redirect with tracking`);
  console.log(`  GET  /analytics             - View click statistics`);
  console.log(`  POST /conversion            - Track conversions`);
  console.log(`  GET  /health                - Health check`);
});

export default app;
