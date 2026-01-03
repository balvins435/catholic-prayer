
import { useState, useEffect, useCallback } from 'react';
// FIX: Use a relative path to import from the parent directory.
import { ApiStatus } from '../types.ts';

interface Cache<T> {
  data: T;
  timestamp: number;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  cacheKey: string,
  cacheDuration: number // in milliseconds
) {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<ApiStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (isRefetch = false) => {
    setStatus('loading');
    setError(null);

    // Check cache first, unless it's a manual refetch
    if (!isRefetch) {
      const cachedItem = localStorage.getItem(cacheKey);
      if (cachedItem) {
        try {
          const cache: Cache<T> = JSON.parse(cachedItem);
          if (Date.now() - cache.timestamp < cacheDuration) {
            setData(cache.data);
            setStatus('success');
            return;
          }
        } catch (e) {
          console.warn("Could not parse cached item:", e);
          localStorage.removeItem(cacheKey); // Clear corrupted cache
        }
      }
    }

    try {
      const result = await apiCall();
      setData(result);
      setStatus('success');
      // Update cache
      const newCache: Cache<T> = { data: result, timestamp: Date.now() };
      localStorage.setItem(cacheKey, JSON.stringify(newCache));
    } catch (err) {
      console.error(`API call for ${cacheKey} failed:`, err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      setStatus('error');
    }
  }, [apiCall, cacheKey, cacheDuration]);

  useEffect(() => {
    fetchData(false);
  }, [fetchData]);

  const refetch = () => fetchData(true);

  return { data, status, error, refetch };
}
