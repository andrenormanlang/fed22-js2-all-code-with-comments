import { useState } from 'react'

const Posts= () =>{

	type Post = {
		title: string
		likes: number
	}
	const [posts, setPosts] = useState<Post[]>([
		{ title: "React Rocks 🤘🏻!", likes: 1337 },
		{ title: "JSX Rocks Even More 🤘🏻!", likes: 42 },
		{ title: "Got state?", likes: 3 },
	])


	// input State
	const [newPostTitle, setNewPostTitle] = useState("")

	const handleAddLike = (post: Post) => {
		console.log('Want to add like to post:', post);
		post.likes++
		console.log('Post likes are now:', post.likes);

		setPosts([...posts]) //use a spread in order to take in account a new object to render the like

	}

	// const handleDeletePost = (index: number) => {
	// 	const newPosts = [...posts]
	// 	newPosts.splice(index, 1)
	// 	setPosts(newPosts)
	// } //DESTRUCTIVE FUNCTION! AND EVEN WITH SPREAD IS BAD PRACTICE!!!

	/* const handleDeletePost =(postToDelete:Post) =>{
		const newPosts = posts.filter(post => post !== postToDelete)
		setPosts(newPosts)
	} */

	/* const handleDeletePost =(postToDelete:Post) =>{
		const newPosts = posts.filter(post => post !== postToDelete)
		setPosts(newPosts)
	}
 */
	const handleDeletePost = (postToDelete: Post) => {
		// setPosts(posts.filter(post => post !== postToDelete))
		setPosts([...posts])
		setPosts(prevPosts => prevPosts.filter(post => post !== postToDelete))
	}

	// const handleDeletePost = (postToDelete: Post) => {
	// 	// setPosts(posts.filter(post => post !== postToDelete))
	// 	setPosts([...posts, { title: "I am new post", likes: 0 }])
	// 	setPosts(prevPosts => prevPosts.filter(post => post !== postToDelete))
	// }

	const handleFormSubmit = (e: React.FormEvent ) =>{
		// stop form from submitting
		e.preventDefault()

		// add a new post to the post state
		const newPost: Post = {
			title: newPostTitle,
			likes: 0
		}
		setPosts([...posts, newPost])

		// clear newPostTitle state
		setNewPostTitle("")

	}

	return(
		<>
		<h2>Posts</h2>

<form onSubmit={handleFormSubmit}>
	<div className="input-group mb-3">
		<input
			type="text"
			className="form-control"
			placeholder="Post title"
			onChange={(e)=> setNewPostTitle(e.target.value)}
			value={newPostTitle}
		/>
		<button
			type="submit"
			className="btn btn-primary">
			Create
		</button>
	</div>
	{newPostTitle.length > 0 && newPostTitle.length < 5 && (
		<div className="form-text text-warning">Title has to be at least 5 chars.</div>
	)}
</form>

{posts.length > 0 && (
	<ul>
		{
			posts.map( (post, index) => (
				<li key={index}>
					{post.title} ({post.likes} likes)
					<button
						className="btn btn-success ms-1 btn-sm mt-2"
						onClick={() => handleAddLike(post)}
					>❤️</button>
					<button
						className="btn btn-danger btn-sm ms-1 mt-2"
						onClick={() => handleDeletePost(post)}
					>🗑️</button>
				</li>
			))
		}
	</ul>
)}
{posts.length === 0 && (<p>There are no posts at the moment</p>)}
{/* <ul>
{posts.length > 0 ? (
	posts.map((post, index) => (
		<li className="mb-2" key={index}>
			{post.title} ({post.likes} likes)
			<button
			className="btn btn-success ms-2 btn-sm ms"
			onClick={() => handleAddLike(post)}
			>
			❤️
			</button>
			<button
			className="btn btn-danger ms-2 btn-sm ms"
			// onClick={() => handleDeletePost(index)}
			onClick={() => handleDeletePost(post)}
			>
			🗑️
			</button>
		</li>
	))
) : (
	<p>There are no posts</p>
)}
</ul> */}

		</>
	)
}


export default Posts
