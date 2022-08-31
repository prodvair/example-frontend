import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/router";

import {
  LoginRequest,
  RegisterRequest, // logout as apiLogout,
  login as apiLogin,
  logout as apiLogout,
  me as apiMe,
  refresh as apiRefresh,
  register as apiRegister,
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
  const [username, setUsername] = useState({
    full: "",
    initials: "",
  });
  const queryClient = useQueryClient();

  const {
    data: user,
    error,
    isFetched,
    isError,
    ...otherResponse
  } = useQuery(["user"], () => apiMe(), {
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const setUser = useCallback(() => {
    if (!user) return;

    let full = user.email;
    let initials = user.email.split("")[0];

    if (user.first_name || user.last_name) {
      full = `${user.first_name} ${user.last_name}`;
      initials = `${user.first_name ? user?.first_name.split("")[0] : ""}${
        user.last_name ? user?.last_name.split("")[0] : ""
      }`;
    }

    setUsername({
      full,
      initials,
    });
  }, [user]);

  const revalidate = useCallback(() => {
    queryClient.invalidateQueries(["user"]);
  }, [queryClient, setUser]);

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
      return apiRegister(data).then(() => revalidate());
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

  const refresh = useCallback(() => {
    apiRefresh().then(() => revalidate());
  }, [revalidate]);

  useEffect(() => {
    if (!isFetched) {
      return;
    }

    if (middleware === "guest" && user && redirectIfAuthenticated) {
      router.push(redirectIfAuthenticated);
    }

    if ((middleware === "auth" && !user) || isError) {
      if (
        error &&
        error?.response.status === 403 &&
        error?.response.data?.message === "Token is Expired"
      ) {
        refresh();
      } else {
        logout();
      }
    }

    setUser();
  }, [
    error,
    isError,
    isFetched,
    logout,
    middleware,
    redirectIfAuthenticated,
    refresh,
    router,
    user,
  ]);

  return {
    login,
    logout,
    register,
    revalidate,
    user,
    username,
    error,
    isFetched,
    ...otherResponse,
  };
}
