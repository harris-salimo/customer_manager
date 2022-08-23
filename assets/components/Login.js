import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = await axios.post("http://127.0.0.1:8000/api/login_check", credentials).then(response => response.data.token);

      localStorage.setItem("token", token);

      axios.defaults.headers["Authorization"] = "Bearer " + token;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <label className="form-label" htmlFor="username">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            id="username"
            placeholder="johndoe@example.com"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <input class="btn btn-primary" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
