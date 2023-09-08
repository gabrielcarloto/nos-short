import { useState } from "react";

import { MINUTE } from "../utils/date-format";
import safeCall from "../utils/safeCall";
import useLazyFetch, { Config } from "./useLazyFetch";
import type { SavedLink } from "./useSavedLinks";
import useSavedLinks from "./useSavedLinks";

export interface ShortenedURL {
  url: string;
  key: string;
  ttl: number;
  link_url: string;
}

export default function useCreateLink(config: Config<ShortenedURL> = {}) {
  const [_, setSavedLinks] = useSavedLinks();
  const [shortenedLink, setShortenedLink] = useState<SavedLink | null>(null);

  const [load, state] = useLazyFetch<ShortenedURL>({
    ...config,
    onSuccess: (data) => {
      safeCall(config.onSuccess, data);

      const parsedData: SavedLink = {
        url: data.url,
        link_url: data.link_url,
        key: data.key,
        expires: Date.now() + data.ttl * 1000,
      };

      setSavedLinks((prevLinks) => [...prevLinks, parsedData]);
      setShortenedLink(parsedData);
    },
  });

  async function createLink(link: string, ttl: number = MINUTE * 10) {
    setShortenedLink(null);
    const params = new URLSearchParams({
      url: link,
      ttl: String(ttl),
    });

    await load("create/?" + params.toString(), {
      headers: {
        Accept: "application/json",
      },
    });
  }

  return [createLink, { ...state, data: shortenedLink }] as const;
}
