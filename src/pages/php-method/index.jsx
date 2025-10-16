import { useEffect, useState } from "react";
import { MRTHOD1_URL, New_Method, SERVER_URL } from "../../libs/constants";
import styles from "../../styles/style.module.css";

function PhpMethod() {
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

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.dashboardContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>PHP Script Method</h2>
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
                  onClick={() =>
                    (window.location.href = `${New_Method}?id=3004`)
                  }
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

export default PhpMethod;
