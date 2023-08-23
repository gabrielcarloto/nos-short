import { useState } from "react";

import useSavedLinks from "./useSavedLinks";

export interface ShortenedURL {
  url: string;
  key: string;
  ttl: number;
  link_url: string;
}

type APICreateResponse =
  | ShortenedURL
  | {
      error: {
        message: string;
        type: string;
      };
    };

export default function useLinksAPI() {
  const [_, setSavedLinks] = useSavedLinks();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function createShortenedLink(link: string) {
    const API_URL = "https://url.api.stdlib.com/temporary@0.3.0/create/";
    setLoading(true);
    setError(false);

    const params = new URLSearchParams({
      url: link,
    });

    try {
      const res = await fetch(API_URL + "?" + params.toString());

      const data: APICreateResponse = await res.json();

      if ("error" in data) throw new Error("API Error: " + data.error.message);

      setSavedLinks((l) => [
        ...l,
        {
          url: data.url,
          link_url: data.link_url,
          key: data.key,
          expires: new Date(Date.now() + data.ttl * 1000),
        },
      ]);
    } catch (e) {
      setError(true);
      // eslint-disable-next-line no-console
      if (e instanceof Error) console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return [{ createShortenedLink }, loading, error] as const;
}
