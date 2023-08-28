import { useEffect, useState } from "react";

import type { ShortenedURL } from "./useLinksAPI";

export type SavedLink = Omit<ShortenedURL, "ttl"> & {
  expires: Date;
};

export default function useSavedLinks() {
  const KEY = "savedLinks";
  const [links, setLinks] = useState<SavedLink[]>(() => {
    const item = localStorage.getItem(KEY);
    return (item ? JSON.parse(item) : []) as SavedLink[];
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(links));
  }, [links]);

  return [links, setLinks] as const;
}
