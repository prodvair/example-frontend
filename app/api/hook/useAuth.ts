import { useCallback, useEffect } from "react";

import { useRouter } from "next/router";

import {
  LoginRequest,
  register as apiRegister,
  login as apiLogin,
  logout as apiLogout,
  me as apiMe,
  RegisterRequest, // logout as apiLogout,
} from "@/app/api/fetchers/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type AuthMiddleware = "auth" | "guest" | null | undefined;

export type UseAuthOptions = {
  middleware?: AuthMiddleware;
  redirectIfAuthenticated?: string | null | false;
  redirectIfNotAuthenticated?: string | null | false;
};

export function useAuth({
  middleware,
  redirectIfAuthenticated,
  redirectIfNotAuthenticated = "/login",
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

  const login = useCallback(
    (data: LoginRequest) => {
      return apiLogin(data).then((res) => {
        revalidate();
        return res;
      });
    },
    [revalidate]
  );

  const register = useCallback(
    (data: RegisterRequest) => {
      return apiRegister(data).then((res) => {
        revalidate();
        return res;
      });
    },
    [revalidate]
  );

  const logout = useCallback(() => {
    if (!error) {
      apiLogout().then(() => revalidate());
    }

    if (redirectIfNotAuthenticated) {
      router.push(redirectIfNotAuthenticated);
    }
  }, [error, redirectIfNotAuthenticated, revalidate, router]);

  useEffect(() => {
    if (!isFetched) {
      return;
    }

    if (middleware === "guest" && user && redirectIfAuthenticated) {
      router.push(redirectIfAuthenticated);
    }

    if (middleware === "auth" && !user) {
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
    register,
    revalidate,
    user,
    error,
    isFetched,
    ...otherResponse,
  };
}
