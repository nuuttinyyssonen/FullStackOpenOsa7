import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { notificationSetter } from "./reducers/notificationReducer";
import { initializeBlogs, likeBlog, createBlog } from "./reducers/blogReducer";


const App = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);


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

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await blogService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
      dispatch(notificationSetter())
    }
  };

  const handleLike = async (author, likes, title, url, id) => {
    try {
      dispatch(likeBlog(id, author, title, likes, url))
    } catch (error) {
      console.error(error);
    }
  };

  let blogs = useSelector(({blogs}) => {
    const sortedBlogs = [...blogs].sort((first, second) => second.likes - first.likes)
    return sortedBlogs
  })

  const blogsMap = () => {
    return blogs.map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        user={user}
        handleLike={() =>
          handleLike(blog.author, blog.likes, blog.title, blog.url, blog.id)
        }
      />
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
    <div>
    <Notification />
      <LoginForm
        username={username}
        password={password}
        setPassword={setPassword}
        setUsername={setUsername}
        handleSubmit={handleLogin}
        user={user}
      />

      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button id="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {user && (
        <Togglable buttonLabel="create new blog">
          <BlogForm
            user={user}
            handleNewPost={handleNewPost}
            title={title}
            author={author}
            url={url}
            handleAuthorChange={(event) => setAuthor(event.target.value)}
            handleTitleChange={(event) => setTitle(event.target.value)}
            handleUrlChange={(event) => setUrl(event.target.value)}
          />
        </Togglable>
      )}

      <div>
        {user && (
          <div>
            <h2>Blogs</h2>
            {blogsMap()}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
