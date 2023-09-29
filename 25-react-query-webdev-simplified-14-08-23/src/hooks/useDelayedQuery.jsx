import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../api/posts";

export function useDelayedQuery() {
  const queryClient = useQueryClient();
  const queryKey = ["posts"];

  useEffect(() => {
    const delay = 1500; // Set your desired delay time
    const timeout = setTimeout(() => {
      // Invalidate the existing query to simulate fetching from the server
      queryClient.invalidateQueries(queryKey);
    }, delay);

    return () => clearTimeout(timeout);
  }, [queryClient, queryKey]);

  return useQuery({
    queryKey,
    queryFn: getPosts,
    placeholderData: [{ id: 1, title: "Initial Data" }],
  });
}
