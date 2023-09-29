import { useInfiniteQuery } from "@tanstack/react-query"
import { getPostsPaginated } from "./api/posts"

export function PostListInfinite() {
  const {
    status,
    error,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", "infinite"],
    getNextPageParam: prevData => prevData.nextPage,
    queryFn: ({ pageParam = 1 }) => getPostsPaginated(pageParam),
  })

  if (status === "loading") return <h1>Loading...</h1>
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>

  return (
    <>
      <p>Post List Infinite</p>
      {data.pages
        .flatMap(data => data.posts)
        .map(post => (
          <div key={post.id}>{post.title}</div>
        ))}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  )
}
