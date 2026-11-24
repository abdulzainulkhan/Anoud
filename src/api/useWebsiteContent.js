import { useContext } from "react";
import { WebsiteContentContext } from "./WebsiteContentContext";

export default function useWebsiteContent() {
  const context = useContext(WebsiteContentContext);

  if (!context) {
    throw new Error(
      "useWebsiteContent must be used inside WebsiteContentProvider"
    );
  }

  return context;
}