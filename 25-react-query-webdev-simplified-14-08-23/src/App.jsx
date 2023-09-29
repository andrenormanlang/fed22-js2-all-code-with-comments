/* 1st part of tutorial up to 18:00 */
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

// const POSTS = [
// 	{id: 1, title: "Post 1"},
// 	{id: 2, title: "Post 2"},
// ]

/* Query keys for GET */
// /posts -> ["posts"]
// /posts/1 -> ["posts", post.id]
// /posts?authorId=1 -> ["posts", {authorId:1}]
// posts/2/comments -> ["posts", post.id, "comments"]

// function App() {
	// console.log(POSTS);
	// const queryClient = useQueryClient()
	// const postsQuery = useQuery({
	// 	queryKey: ["posts"],
	// 	queryFn: () => wait(1000).then(() =>[...POSTS])
	// 	// queryFn: () => Promise.reject("Error Message")
	// })
	// const postsQuery = useQuery({
	// 	queryKey: ["posts"],
	// 	queryFn: obj => wait(1000).then(() =>{ // in (obj) you pass in your query key!
	// 		console.log(obj)
	// 		return [...POSTS]
	// 	}),
		// queryFn: () => Promise.reject("Error Message")
	// })

	// postsQuery.status === ""

	// const newPostMutation = useMutation({
	// 	mutationFn: title =>{
	// 		return	wait(1000).then(() =>
	// 			POSTS.push({id: crypto.randomUUID(), title})
	// 		)
	// 	},
	// 	onSuccess: () =>{
	// 		queryClient.invalidateQueries(["posts"])
	// 	}
	// })

	// if(postsQuery.isLoading) return <h1>Loading...</h1>
	// if(postsQuery.isError){
	// 	return <pre>{JSON.stringify(postsQuery.error)}</pre>
	// }

	// return <div>
	// 	{postsQuery.data.map(post =>(
	// 		<div key={post.id}>{post.title}</div>
	// 	))}
		{/* <button disabled={newPostMutation.isLoading} onClick={()=> newPostMutation.mutate("New Post")}>
			Add New
		</button> */}
// 	</div>
// }
// function wait(duration) {
//   return new Promise(resolve => setTimeout(resolve, duration))
// }

// export default App


/* 2nd part of tutorial from 18:00 */
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { getPost } from "./api/posts"
import { CreatePost } from "./CreatePost"
import Post from "./Post"
import { PostListInfinite } from "./PostListInfinite"
import { PostListPaginated } from "./PostListPaginated"
import PostsList1 from "./PostsList1"
import PostsList2 from "./PostsList2"
import PostListWithUsers from "./PostListWithUsers"
import './App.css'

export default function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />)
  const queryClient = useQueryClient()

  function onHoverPostOneLink() {
    queryClient.prefetchQuery({
      queryKey: ["posts", 1],
      queryFn: () => getPost(1),
    })
  }

  return (
    <div className="container">
      <button className="button" onClick={() => setCurrentPage(<PostsList1 />)}>
        Posts List 1
      </button>
      <button className="button" onClick={() => setCurrentPage(<PostsList2 />)}>
        Posts List 2
      </button>
      <button
	  	className="button"
        onMouseEnter={onHoverPostOneLink}
        onClick={() => setCurrentPage(<Post id={1} />)}
      >
        First Post
      </button>
	  <button
	  	className="button"
        onClick={() => setCurrentPage(<PostListWithUsers />)}
      >
        Posts and Users
      </button>
      <button
	  	className="button"
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        New Post
      </button>
      <button className="button" onClick={() => setCurrentPage(<PostListPaginated />)}>
        Post List Paginated
      </button>
      <button className="button" onClick={() => setCurrentPage(<PostListInfinite />)}>
        Post List Infinite
      </button>
      <br />
      {currentPage}
    </div>
  )
}
