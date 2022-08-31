import { useCallback } from "react";

import { useQuery } from "@tanstack/react-query";

import { TaskQuery, getTasks } from "../fetchers/task";

export function useTasks(query: TaskQuery = {per_page: 12}) {
  const {
    data: tasks,
    error,
    isFetched,
    ...otherResponse
  } = useQuery(["tasks"], () => getTasks(query), {
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  return {
    tasks,
    error,
    isFetched,
    ...otherResponse,
  };
}
