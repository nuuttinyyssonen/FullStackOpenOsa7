import React, { useEffect } from "react";
import { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { notificationSetter } from "../reducers/notificationReducer";
import Notification from "./Notification";
import { deleteBlog, initializeBlogs, likeBlog } from "../reducers/blogReducer";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import Navbar from "./Navbar";


const Blog = ({
}) => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [blogUser, setBlogUser] = useState("")

  const user = useSelector(({user}) => {
    return user
  })

  const id = useParams().id

  const handleLike = async (author, likes, title, url, id) => {
    try {
      dispatch(likeBlog(id, author, title, likes, url))
    } catch (error) {
      console.error(error);
    }
  };

  const blog = useSelector(({blogs}) => {
    const blogById = blogs.find(n => n.id === id)
    return blogById
  })

  const handleDelete = async (id, title, author) => {
    if (window.confirm("Remove blog " + title + " by " + author)) {
      try {
        dispatch(deleteBlog(id))
        dispatch(initializeBlogs())
        navigate("/home")
      } catch (error) {
        dispatch(notificationSetter(error.response.data.error))
      }
    }
  };

  if(!blog) {
    return null
  }

  return (
    <div className="blog-post">
      <Navbar />
      <Logout />
      <Notification />
      <h1>
        {blog.title}{" "}
      </h1>
        <div>
          <h3>{blog.url}</h3>
          <h3 data-testid="likes">
            {blog.likes}{" "}
            <button className="like-btn" onClick={() => handleLike(blog.author, blog.likes, blog.title, blog.url, blog.id)}>
              like
            </button>
          </h3>
          <h3>{blog.author}</h3>
          {blog.user.username === user.username && (
            <button
              id="remove-btn"
              onClick={() => handleDelete(blog.id, blog.title, blog.author)}
            >
              Remove
            </button>
          )}
        </div>
    </div>
  );
};

export default Blog;
