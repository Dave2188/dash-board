import React, { useState, useEffect } from "react";
import { formTheme } from "./styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ setCurrentId, currentId }) => {
	const [postData, setPostData] = useState({
		creator: " ",
		title: " ",
		message: " ",
		tags: " ",
		selectedFile: " ",
	});
	const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));
	const classes = formTheme;
	const dispatch = useDispatch();

	useEffect(() => {
		if (post) setPostData(post);
	}, [post]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (currentId) {
			dispatch(updatePost(currentId, postData));
		} else {
			dispatch(createPost(postData));
		}

		clear();
	};

	const clear = () => {
		setCurrentId(null);
		setPostData({
			creator: " ",
			title: " ",
			message: " ",
			tags: " ",
			selectedFile: " ",
		});
	};

	return (
		<ThemeProvider theme={classes}>
			<Paper style={classes.paper}>
				<form autoComplete="off" noValidate onSubmit={handleSubmit}>
					<Typography sx={{ textAlign: "center" }} variant="h6">
						Creating a Memory
					</Typography>
					<TextField
						sx={{ marginBottom: "8px" }}
						name="creator"
						variant="outlined"
						label="Creator"
						fullWidth
						value={postData.creator}
						onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
					/>
					<TextField
						sx={{ marginBottom: "8px" }}
						name="title"
						variant="outlined"
						label="Title"
						fullWidth
						value={postData.title}
						onChange={(e) => setPostData({ ...postData, title: e.target.value })}
					/>
					<TextField
						sx={{ marginBottom: "8px" }}
						name="message"
						variant="outlined"
						label="Message"
						fullWidth
						value={postData.message}
						onChange={(e) => setPostData({ ...postData, message: e.target.value })}
					/>
					<TextField
						sx={{ marginBottom: "8px" }}
						name="tags"
						variant="outlined"
						label="Tags"
						fullWidth
						value={postData.tags}
						onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
					/>
					<div style={{ marginBottom: 8 }}>
						<FileBase
							type="file"
							multiple={false}
							onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
						/>
					</div>
					<Button style={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
						Submit
					</Button>
					<Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
						Clear
					</Button>
				</form>
			</Paper>
		</ThemeProvider>
	);
};

export default Form;
