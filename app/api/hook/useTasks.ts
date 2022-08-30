
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { getTasks, TaskQuery } from "../fetchers/task";



export function useTasks(query: TaskQuery = {}) {
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
