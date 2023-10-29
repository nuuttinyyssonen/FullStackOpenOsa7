import React from "react";
import '../css/login.css'

const LoginForm = ({
  username,
  password,
  setPassword,
  setUsername,
  handleSubmit,
  user,
}) => {
  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <h1>login to application</h1>
      <div className="username">
        username
        <input
          type="text"
          value={username}
          name="username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div className="password">
        password
        <input
          type="password"
          value={password}
          name="password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div className="btn-cont">
        <button id="login-btn" type="submit">
          Login
        </button>
      </div>
      
    </form>
  );

  return <div className="container">{!user && loginForm()}</div>;
};

export default LoginForm;
