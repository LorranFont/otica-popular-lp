"use client";

import { useState, useEffect, useCallback } from "react";
import { ApiResponse } from "@/lib/api/types";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface UseApiOptions {
  immediate?: boolean; // Execute immediately on mount
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

export function useApi<T>(
  apiFunction: () => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiFunction();

      if (response.success) {
        setState({
          data: response.data,
          loading: false,
          error: null,
          success: true,
        });
        onSuccess?.(response.data);
      } else {
        setState({
          data: null,
          loading: false,
          error: response.error || "Erro desconhecido",
          success: false,
        });
        onError?.(response.error || "Erro desconhecido");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro de conexão";
      setState({
        data: null,
        loading: false,
        error: errorMessage,
        success: false,
      });
      onError?.(errorMessage);
    }
  }, [apiFunction, onSuccess, onError]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    reset,
    refetch: execute,
  };
}

// Hook for API calls with parameters
export function useApiWithParams<T, P extends any[]>(
  apiFunction: (...params: P) => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
) {
  const { onSuccess, onError } = options;

  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
    success: false,
  });

  const execute = useCallback(
    async (...params: P) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiFunction(...params);

        if (response.success) {
          setState({
            data: response.data,
            loading: false,
            error: null,
            success: true,
          });
          onSuccess?.(response.data);
          return response.data;
        } else {
          setState({
            data: null,
            loading: false,
            error: response.error || "Erro desconhecido",
            success: false,
          });
          onError?.(response.error || "Erro desconhecido");
          return null;
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Erro de conexão";
        setState({
          data: null,
          loading: false,
          error: errorMessage,
          success: false,
        });
        onError?.(errorMessage);
        return null;
      }
    },
    [apiFunction, onSuccess, onError]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Hook for paginated API calls
export function usePaginatedApi<T>(
  apiFunction: (
    page: number,
    limit: number
  ) => Promise<{
    data: T[];
    pagination: any;
    success: boolean;
    error?: string;
  }>,
  initialLimit: number = 10,
  options: UseApiOptions = {}
) {
  const { onSuccess, onError } = options;

  const [state, setState] = useState({
    data: [] as T[],
    loading: false,
    error: null as string | null,
    success: false,
    pagination: {
      page: 1,
      limit: initialLimit,
      total: 0,
      totalPages: 0,
    },
    hasMore: false,
  });

  const loadPage = useCallback(
    async (page: number, append: boolean = false) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiFunction(page, state.pagination.limit);

        if (response.success) {
          setState((prev) => ({
            data: append ? [...prev.data, ...response.data] : response.data,
            loading: false,
            error: null,
            success: true,
            pagination: response.pagination,
            hasMore: response.pagination.page < response.pagination.totalPages,
          }));
          onSuccess?.(response.data);
        } else {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: response.error || "Erro desconhecido",
            success: false,
          }));
          onError?.(response.error || "Erro desconhecido");
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Erro de conexão";
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
          success: false,
        }));
        onError?.(errorMessage);
      }
    },
    [apiFunction, state.pagination.limit, onSuccess, onError]
  );

  const loadMore = useCallback(() => {
    if (state.hasMore && !state.loading) {
      loadPage(state.pagination.page + 1, true);
    }
  }, [loadPage, state.hasMore, state.loading, state.pagination.page]);

  const refresh = useCallback(() => {
    loadPage(1, false);
  }, [loadPage]);

  const reset = useCallback(() => {
    setState({
      data: [],
      loading: false,
      error: null,
      success: false,
      pagination: {
        page: 1,
        limit: initialLimit,
        total: 0,
        totalPages: 0,
      },
      hasMore: false,
    });
  }, [initialLimit]);

  useEffect(() => {
    loadPage(1, false);
  }, [loadPage]);

  return {
    ...state,
    loadMore,
    refresh,
    reset,
    loadPage: (page: number) => loadPage(page, false),
  };
}
