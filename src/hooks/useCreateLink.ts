import { useState } from "react";

import type { SavedLink } from "./useSavedLinks";
import useSavedLinks from "./useSavedLinks";

export interface ShortenedURL {
  url: string;
  key: string;
  ttl: number;
  link_url: string;
}

interface APIError {
  error: {
    message: string;
    type: string;
  };
}

type APICreateResponse = ShortenedURL;

async function apiFetch<T extends object>(
  url: string,
  opts: RequestInit | undefined = undefined,
) {
  const BASE_API_URL = "https://url.api.stdlib.com/temporary@0.3.0/";

  try {
    const res = await fetch(BASE_API_URL + url, opts);
    const data = (await res.json()) as T | APIError;

    if ("error" in data) throw new Error("API Error: " + data.error.message);

    return data;
  } catch (e) {
    return e as Error;
  }
}

export default function useCreateLink(config?: { onSuccess?: () => void }) {
  const [_, setSavedLinks] = useSavedLinks();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<SavedLink>();

  async function load(link: string) {
    setData(undefined);
    setError(undefined);
    setLoading(true);

    const params = new URLSearchParams({
      url: link,
    });

    const data = await apiFetch<APICreateResponse>(
      "create/?" + params.toString(),
    );

    if (data instanceof Error) {
      setError(data);
      setLoading(false);
      return;
    }

    const parsedData: SavedLink = {
      url: data.url,
      link_url: data.link_url,
      key: data.key,
      expires: Date.now() + data.ttl * 1000,
    };

    setData(parsedData);
    setSavedLinks((prevLinks) => [...prevLinks, parsedData]);
    setLoading(false);

    if (config?.onSuccess) config.onSuccess();
  }

  return [load, { loading, error, data }] as const;
}
