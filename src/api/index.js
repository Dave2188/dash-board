import axios from "axios";

const url = "http://localhost:3005/posts";

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (_id, updatedPost) =>
	axios.patch(`${url}/${_id}`, updatedPost);
