import { mailchimpService } from "../api/mailchimp";
import { facebookService } from "../api/facebook";
import { useState, useEffect } from "react";

export function useMarketingData() {
  const [mailchimpData, setMailchimpData] = useState(null);
  const [facebookData, setFacebookData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([mailchimpService.getOverview(), facebookService.getOverview()])
      .then(([mailchimp, facebook]) => {
        setMailchimpData(mailchimp);
        setFacebookData(facebook);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load marketing data");
        setLoading(false);
      });
  }, []);

  return { mailchimpData, facebookData, loading, error };
}
