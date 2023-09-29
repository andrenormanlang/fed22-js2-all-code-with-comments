import { useQueries, useQuery } from "@tanstack/react-query"
import { getPost, getPosts } from "./api/posts"
import { useDelayedQuery } from "./hooks/useDelayedQuery";

export default function PostsList1() {
//   const postsQuery = useQuery({
//     queryKey: ["posts"],
//     queryFn: getPosts,
	// initialData: [{id: 1, title: "Initial Data"}], //Doesn´t fetch any other data!
	// placeholderData: [{id: 1, title: "Initial Data"}], //Is replaced by the DB data after loaded

	// staleTime: 1000,
	// refetchInterval: 1000,
//   })
//   postsQuery.fetchStatus ==="fetching"
//   postsQuery.status ==="loading"

//   postsQuery.fetchStatus ==="idle"
//   postsQuery.status ==="error"

/* useQueries Hook! */
// const queries = useQueries({
// 	queries: (postsQuery?.data ?? []).map(post =>{
// 		return{
// 			queryKey: ["posts", post.id],
// 			queryFn: () => getPost(post.id),
// 		}
// 	}),
// })

// console.log(queries.map(q => q.data));

// postsQuery.data.map(post =>{
// 	useQuery()
// })
  const postsQuery = useDelayedQuery()

  if (postsQuery.status === "loading") return <h1>Loading...</h1>;
  if (postsQuery.status === "error") {
    return <h1>{JSON.stringify(postsQuery.error)}</h1>
  }

  return (
    <div>
      <p>Posts List 1</p>
      <ol>
        {postsQuery.data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ol>
    </div>
  )
}
