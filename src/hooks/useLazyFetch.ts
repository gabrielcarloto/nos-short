import { useState } from "react";

interface APIError {
  error: {
    message: string;
    type: string;
  };
}

export interface Config<DataType> {
  onSuccess?: (data: DataType) => void;
  onLoading?: () => void;
  onError?: (e: unknown) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function safeCall<T extends (...args: any[]) => void>(
  fn?: T,
  ...args: Parameters<T>
) {
  if (fn) fn(...args);
}

export default function useLazyFetch<DataType = unknown>(
  config: Config<DataType> = {},
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<DataType | null>(null);

  async function load(url: string, opts: RequestInit | undefined = undefined) {
    const BASE_API_URL = "https://url.api.stdlib.com/temporary@0.3.0/";
    safeCall(config.onLoading);
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(BASE_API_URL + url, opts);
      const data = (await res.json()) as DataType | APIError;

      if (typeof data === "object" && data !== null && "error" in data)
        throw new Error("API Error: " + data.error.message);

      safeCall(config.onSuccess, data);
      return data;
    } catch (e) {
      if (e instanceof Error) setError(e);
      safeCall(config.onError, e);
      return e as Error;
    } finally {
      setLoading(false);
    }
  }

  return [load, { data, loading, error }] as const;
}
