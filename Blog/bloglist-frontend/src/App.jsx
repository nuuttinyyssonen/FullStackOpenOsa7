import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";
import Logout from "./components/Logout";
import { useDispatch, useSelector } from "react-redux";
import { notificationSetter } from "./reducers/notificationReducer";
import { initializeBlogs, likeBlog, createBlog } from "./reducers/blogReducer";
import { loginUser, logoutUser } from "./reducers/userReducer";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import './css/app.css'
import Navbar from "./components/Navbar";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs())
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = {
        username,
        password
      }
      dispatch(loginUser(user))
      setUsername("");
      setPassword("");
      navigate("/home")
    } catch (error) {
      console.error(error);
      dispatch(notificationSetter())
    }
  };

  let blogs = useSelector(({blogs}) => {
    const sortedBlogs = [...blogs].sort((first, second) => second.likes - first.likes)
    return sortedBlogs
  })

  const blogsMap = () => {
    return blogs.map((blog) => (
      <div>
        <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
      </div>
    ));
  };

  const handleNewPost = async (event) => {
    event.preventDefault();
    try {
      const newBlogPost = {
        title: title,
        author: author,
        url: url,
      };
      dispatch(createBlog(newBlogPost))
      dispatch(notificationSetter(newBlogPost.title, newBlogPost.author))
      dispatch(initializeBlogs())
      setAuthor("");
      setTitle("");
      setUrl("");
    } catch (error) {
      dispatch(notificationSetter(error.response.data.error))
      console.error(error);
    }
  };

  return (
    <div className="main-container">
      <Routes>
        <Route path='/' element={
          <LoginForm
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
          handleSubmit={handleLogin}
          />}>
        </Route>
        <Route path="/users" element={<Users />} />  
        <Route path="/users/:id" element={<User />} />
        <Route path="/home" element={<>
          <Navbar />
          <Logout />
          <Notification />
            <Togglable buttonLabel="create new blog">
            <BlogForm
              handleNewPost={handleNewPost}
              title={title}
              author={author}
              url={url}
              handleAuthorChange={(event) => setAuthor(event.target.value)}
              handleTitleChange={(event) => setTitle(event.target.value)}
              handleUrlChange={(event) => setUrl(event.target.value)}
            />
          </Togglable>
          <div>
              <h2>Blogs</h2>
              {blogsMap()}
          </div>
        </>} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
