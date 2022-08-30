import { useCallback, useEffect } from "react";

import { useRouter } from "next/router";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  LoginRequest,
  login as apiLogin,
  logout as apiLogout,
  me as apiMe,
  // logout as apiLogout,
} from "@/app/api/fetchers/auth";

export type AuthMiddleware = "auth" | "guest" | null | undefined;

export type UseAuthOptions = {
  middleware?: AuthMiddleware;
  redirectIfAuthenticated?: string | null | false;
  redirectIfNotAuthenticated?: string | null | false;
};

export function useAuth({
  middleware,
  redirectIfAuthenticated,
  redirectIfNotAuthenticated = "/",
}: UseAuthOptions = {}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: user,
    error,
    isFetched,
    ...otherResponse
  } = useQuery(["user"], () => apiMe(), {
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const revalidate = useCallback(() => {
    queryClient.invalidateQueries(["user"]);
  }, [queryClient]);

  const login = useCallback((data: LoginRequest) => {
    return apiLogin(data).then((res) => {
      revalidate();
      return res
    });
  }, [revalidate]);

  const logout = useCallback(async () => {
    if (!error) {
      await apiLogout();

      revalidate();
    }

    if (redirectIfNotAuthenticated) {
      router.push(redirectIfNotAuthenticated);
    }
  },[error, redirectIfNotAuthenticated, revalidate, router]);

  useEffect(() => {
    if (!isFetched) {
      return;
    }

    if (middleware === "guest" && user && redirectIfAuthenticated) {
      router.push(redirectIfAuthenticated);
    }

    if (middleware === "auth" && error) {
      logout();
    }
  }, [
    error,
    isFetched,
    logout,
    middleware,
    redirectIfAuthenticated,
    router,
    user,
  ]);

  return {
    login,
    logout,
    revalidate,
    user,
    error,
    isFetched,
    ...otherResponse,
  };
}
