import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SERVER_URL } from "../../../libs/constants";

function OutPage() {
  const { id } = useParams();

  useEffect(() => {
    fetch(`${SERVER_URL}${id}`)
      .then((res) => res.json())
      .then((deal) => {
        console.log(deal);
        if (deal.redirect_link) {
          // Redirect after 1 second for loader effect
          setTimeout(() => {
            window.location.href = deal.redirect_link;
          }, 1000);
        }
      })
      .catch((err) => {
        console.error("Error fetching redirect link:", err);
      });
  }, [id]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Redirecting you to the best deal...</h2>
      <p>Please wait a moment 🔄</p>
    </div>
  );
}

export default OutPage;
