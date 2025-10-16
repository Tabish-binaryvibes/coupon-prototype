import { useEffect, useState } from "react";
import { MRTHOD1_URL, SERVER_URL } from "../../libs/constants";
import styles from "../../styles/style.module.css";

function Dashboard() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    fetch(SERVER_URL)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then((data) => setDeals(data))
      .catch((err) => console.error("Error fetching deals:", err));
  }, []);

  const handleGetDeal = async (dealId) => {
    const targetUrl = `https://www.couponcode2025.com/deal-cards/?clickref=1101lBMJ4cbo&af_xp=custom&pid=partnerize_int&is_retargeting=true&af_click_lookback=30d&utm_content=1011l268954&utm_source=partnerize&utm_medium=affiliate&utm_campaign=asadkhan&utm_clickref=1101lBMJ4cbo&clickid=1101lBMJ4cbo&af_reengagement_window=30d&af_siteid=partnerize&utm_term=Coupon/Voucher||PC1|https://www.promocode2025.com/&c=Affiliate`;
    const referrerUrl = "https://promodealcode.com/";

    // Step 1: Create hidden iframe
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    // iframe.sandbox = "allow-scripts allow-same-origin";
    document.body.appendChild(iframe);

    // Step 2: Load target site silently
    iframe.src = targetUrl;

    // Step 3: Wait for iframe to load
    await new Promise((resolve) => {
      iframe.onload = () => resolve();
    });

    // const iframeDoc = iframe.contentDocument;
    // if (!iframeDoc) {
    //   console.error("Iframe content not accessible");
    //   return;
    // }

    // const content = iframeDoc.documentElement.outerHTML;

    const response = await fetch(
      `${MRTHOD1_URL}htmlContent?url=${encodeURIComponent(targetUrl)}`
    );
    const htmlContent = await response.text();

    // Step 4: Replace main document content
    document.open();
    document.write(htmlContent);
    document.close();

    // Step 5: Update URL bar
    window.history.replaceState(null, "", targetUrl);

    // Step 6: Preserve referrer
    Object.defineProperty(document, "referrer", {
      get: () => referrerUrl,
    });
  };

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.dashboardContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Method # 04</h2>
        </div>

        {deals.length === 0 ? (
          <p>Loading deals...</p>
        ) : (
          <div className={styles.gridContainer}>
            {deals.map((deal) => (
              <div key={deal.id} className={styles.card}>
                <div
                  className={
                    deal.store?.toLowerCase() === "samsung"
                      ? styles.storeSamsung
                      : deal.store?.toLowerCase() === "oneplus"
                      ? styles.storeOneplus
                      : styles.storeDefault
                  }
                >
                  {deal.store}
                </div>
                <div className={styles.discount}>{deal.discount}</div>
                <div className={styles.description}>{deal.description}</div>
                <p className={styles.expiry}>
                  <strong>Expires:</strong> {deal.expiry}
                </p>
                <button
                  className={styles.button}
                  onClick={() => handleGetDeal("3004")}
                >
                  Get This Deal
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
