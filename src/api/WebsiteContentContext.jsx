import { createContext, useEffect, useState, useCallback } from "react";
import { fetchGoogleSheet } from "./fetchGoogleSheet";

export const WebsiteContentContext = createContext(null);

export function WebsiteContentProvider({ children }) {
  const [adCard, setAdCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContent = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchGoogleSheet(
        process.env.REACT_APP_WEBSITE_CONTENT
      );

      const cleanedData = data
        .filter((row) => row.code?.trim())
        .map((row) => ({
          ...row,
          is_active: String(row.is_active).toLowerCase() === "true",
        }));

      setAdCard(cleanedData);
    } catch (err) {
      console.error("Failed to load website content:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return (
    <WebsiteContentContext.Provider
      value={{
        adCard,
        loading,
        error,
        refresh: fetchContent,
      }}
    >
      {children}
    </WebsiteContentContext.Provider>
  );
}