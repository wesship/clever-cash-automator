
import { useState, useCallback } from "react";
import { toast } from "sonner";

interface UseAsyncOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
}

interface UseAsyncReturn<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

export function useAsync<T = any>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options: UseAsyncOptions<T> = {}
): UseAsyncReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const {
    onSuccess,
    onError,
    loadingMessage,
    successMessage,
    errorMessage,
  } = options;

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      try {
        setIsLoading(true);
        setIsSuccess(false);
        setIsError(false);
        setError(null);

        if (loadingMessage) {
          toast.loading(loadingMessage);
        }

        const result = await asyncFunction(...args);
        
        setData(result);
        setIsSuccess(true);
        
        if (successMessage) {
          toast.success(successMessage);
        }
        
        onSuccess && onSuccess(result);
        return result;
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
        setIsError(true);
        
        if (errorMessage) {
          toast.error(errorMessage);
        } else {
          toast.error(errorObj.message);
        }
        
        onError && onError(errorObj);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFunction, onSuccess, onError, loadingMessage, successMessage, errorMessage]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
  }, []);

  return {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    execute,
    reset,
  };
}
