import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [deals, setDeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/deals")
      .then((res) => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then((data) => setDeals(data))
      .catch((err) => console.error("Error fetching deals:", err));
  }, []);

  return (
    <div style={{ padding: "20px", background: "#f5f6f8", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <h2 style={{ fontSize: "1.6rem", fontWeight: "600", color: "#222" }}>
            🔥 Agoda Deals
          </h2>
        </div>

        {deals.length === 0 ? (
          <p>Loading deals...</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {deals.map((deal) => (
              <div
                key={deal.id}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 6px 15px rgba(0,0,0,0.15)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 2px 6px rgba(0,0,0,0.08)")
                }
              >
                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color:
                      deal.store?.toLowerCase() === "samsung"
                        ? "#0c4da2"
                        : deal.store?.toLowerCase() === "oneplus"
                        ? "#d81921"
                        : "#333",
                  }}
                >
                  {deal.store}
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    color: "#222",
                  }}
                >
                  {deal.discount}
                </div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    marginBottom: "15px",
                    color: "#555",
                  }}
                >
                  {deal.description}
                </div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#777",
                    marginBottom: "15px",
                  }}
                >
                  <strong>Expires:</strong> {deal.expiry}
                </p>
                <button
                  style={{
                    marginTop: "auto",
                    backgroundColor: "#009688",
                    border: "none",
                    padding: "10px 14px",
                    color: "#fff",
                    borderRadius: "8px",
                    fontWeight: "500",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition: "background 0.3s",
                  }}
                  onClick={() =>
                    window.open(
                      "https://www.thevoucherdeals.com/out/?id=162&tr=1",
                      "_blank"
                    )
                  }
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#00796b")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#009688")
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

export default Dashboard;
