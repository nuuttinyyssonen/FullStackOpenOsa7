import React, { useEffect } from "react";
import { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { notificationSetter } from "../reducers/notificationReducer";
import Notification from "./Notification";
import { deleteBlog, initializeBlogs } from "../reducers/blogReducer";

const Blog = ({
  blog,
  user,
  handleLike,
}) => {
  const [isShown, setIsShown] = useState(false);
  const [button, setButton] = useState("Show");
  const dispatch = useDispatch()

  const handleDelete = async (id, title, author) => {
    if (window.confirm("Remove blog " + title + " by " + author)) {
      try {
        dispatch(deleteBlog(id))
        dispatch(initializeBlogs())
      } catch (error) {
        dispatch(notificationSetter(error.response.data.error))
      }
    }
  };

  const toggleVisibility = () => {
    if (isShown) {
      setIsShown(false);
      setButton("Show");
    } else {
      setIsShown(true);
      setButton("Hide");
    }
  };

  return (
    <div className="blog-post">
      <p>
        {blog.title}{" "}
        <button className="show-btn" onClick={toggleVisibility}>
          {button}
        </button>
      </p>
      {isShown && (
        <div>
          <p>{blog.url}</p>
          <p data-testid="likes">
            {blog.likes}{" "}
            <button className="like-btn" onClick={handleLike}>
              like
            </button>
          </p>
          <p>{blog.author}</p>
          {user && blog.user.username === user.username && (
            <button
              id="remove-btn"
              onClick={() => handleDelete(blog.id, blog.title, blog.author)}
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
