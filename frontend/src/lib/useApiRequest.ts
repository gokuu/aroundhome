import { useCallback, useState } from "react";
import { API_URL } from "./constants";

interface UseApiRequestParameters {
  url: string;
  method?: "GET" | "POST";
}

interface ExecuteParameters {
  payload?: Record<string, unknown>;
  queryParameters?: Record<string, number | string>;
}

interface UseApiRequestReponse<T> {
  loading: boolean;
  error?: string | undefined;
  data?: T;
  execute: (params?: ExecuteParameters) => Promise<void>;
}

export default function useApiRequest<T>({
  url,
  method = "GET",
}: UseApiRequestParameters): UseApiRequestReponse<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<T>();

  const execute = useCallback(
    async (params?: ExecuteParameters) => {
      const { queryParameters, payload } = params ?? {};
      const options: RequestInit = {
        method,
        headers: { "content-type": "application/json" },
      };
      const uri = new URL(`${API_URL}${url}`);

      if (queryParameters) {
        const params = new URLSearchParams(
          queryParameters as Record<string, string>
        );

        uri.search = params.toString();
      }

      if (payload) {
        options.body = JSON.stringify(payload);
      }

      try {
        setError(undefined);
        setLoading(true);
        const response = await fetch(uri, options);

        if (response.ok) {
          const result = await response.json();
          setData(result);

          return;
        }

        if (response.status === 400) {
          setError("Invalid request");

          return;
        }

        setError("Unkown error");
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },
    [method, url]
  );

  return { loading, error, data, execute };
}
