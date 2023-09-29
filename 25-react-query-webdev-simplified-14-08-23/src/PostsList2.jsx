import { useQuery } from "@tanstack/react-query"
import { getPosts } from "./api/posts"

export default function PostsList2() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
	staleTime: 3000, // Set a value greater than your intended delay
	 // Set a value greater than your intended delay
  })

  if (postsQuery.isFetching) return <h1>Loading...</h1>
  if (postsQuery.status === "error") {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>
  }

  return (
    <div>
      <p>Post List 2</p>
      <ol>
        {postsQuery.data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  )
}
