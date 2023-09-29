import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./api/posts";
import { getUser } from "./api/users"; // Import the necessary API function

function PostListWithUsers() {
	const { data: posts, isLoading: postsLoading, isError: postsError } = useQuery({
	  queryKey: ["posts"],
	  queryFn: getPosts,
	});

	if (postsLoading) {
	  return <p>Loading posts...</p>;
	}

	if (postsError) {
	  return <p>Error loading posts...</p>;
	}

	return (
	  <div className="post-list">
		{posts.map((post) => (
		  <div className="post" key={post.id}>
			<h2>{post.title}</h2>
			<p className="post-body">{post.body}</p>
			<UserDetails id={post.id} />
		  </div>
		))}
	  </div>
	);
  }

  function UserDetails({ id }) {
	const { data: user, isLoading: userLoading, isError: userError } = useQuery({
	  queryKey: ["users", id],
	  queryFn: () => getUser(id),
	});

	if (userLoading) {
	  return <p>Loading user...</p>;
	}

	if (userError) {
	  return <p>Error loading user...</p>;
	}

	return (
	  <div className="user-details">
		<p className="user-name">Author: {user.name}</p>
		<p className="user-email">Email: {user.email}</p>
		<p className="user-email">Phone: {user.phone}</p>
		<p className="user-email">Company: {user.company.name}</p>
		{/* Display other user details as needed */}
	  </div>
	);
  }

  export default PostListWithUsers;
