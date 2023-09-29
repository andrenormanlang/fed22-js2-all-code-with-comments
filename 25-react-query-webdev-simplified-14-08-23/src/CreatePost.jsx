import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { createPost } from "./api/posts"
import Post from "./Post"; // Corrected import


export function CreatePost({ setCurrentPage }) {
  const titleRef = useRef()
  const bodyRef = useRef()
  const queryClient = useQueryClient()
  const createPostMutation = useMutation({
    // mutationFn: (variables) =>{
	// 	createPost(variables)
	// }
    mutationFn: createPost,
	onSuccess: (data) =>{
		queryClient.setQueryData(["posts", data.id], data )
		// queryClient.setQueryData(["posts", data.id], (oldData) =>{

		// } )
		queryClient.invalidateQueries(["posts"], { exact: true })
		setCurrentPage(<Post id={data.id}/>)
	},
	// retry: 3,
	// onSuccess: (data, variables, context )
	// onError: (error, variables, context)
	// onSettled: (data, error, variables, context )
	// onSuccess: (data, variables, context ) =>{
	// 	console.log(context);
	// },
	// onMutate: (variables) =>{
	// 	return{hi: "Bye"} //context value
	// }
  })

// createPostMutation.data
// createPostMutation.error
// createPostMutation.status === "idle"
// createPostMutation.mutate()
// createPostMutation.mutateAsync().then(()=>{

// })
// createPostMutation.mutate({}, {onError})


  function handleSubmit(e) {
    e.preventDefault()
    createPostMutation.mutate({
      title: titleRef.current.value,
      body: bodyRef.current.value,
    })
  }

  return (
    <div>
      {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button disabled={createPostMutation.isLoading}>
          {createPostMutation.isLoading ? "Loading..." : "Create"}
        </button>
      </form>
    </div>
  )
}
