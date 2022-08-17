import { useContext, useState } from "react";

import { AuthContext } from "../shared/context/auth-context";
import Input from "./Input";
import Button from "./Button";

import "./AuthPanel.css";
import axios from "axios";

const url = "http://localhost:5000/api/users";

const AuthPanel = () => {
  const auth = useContext(AuthContext);
  const [isLoggin, setIsLoggin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const formChangeHandler = (event) => {
    setForm((form) => {
      return { ...form, [event.target.name]: event.target.value };
    });
  };

  const setLoginHandler = (event) => {
    event.preventDefault();
    setIsLoggin(true);
  };
  const setSignUpHandler = (event) => {
    event.preventDefault();
    setIsLoggin(false);
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    let response;

    try {
      response = await axios.post(url + "/signup", form);
      auth.login(response.data.id, response.data.token);
    } catch (error) {}
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    let response;

    try {
      response = await axios.post(url + "/login", form);
      auth.login(response.data.id, response.data.token);
    } catch (error) {}
  };

  return (
    <form className="auth-panel">
      {!isLoggin && (
        <>
          <Input
            value={form.name}
            name="name"
            placeholder="Name"
            onChange={formChangeHandler}
          />
          <Input
            value={form.email}
            name="email"
            placeholder="Email"
            type="email"
            onChange={formChangeHandler}
          />
          <Input
            value={form.password}
            name="password"
            placeholder="Password"
            type="password"
            onChange={formChangeHandler}
          />
          <Button big anime onClick={signUpHandler}>
            Sign up
          </Button>
        </>
      )}
      {isLoggin && (
        <>
          <Input
            value={form.email}
            name="email"
            placeholder="Email"
            type="email"
            onChange={formChangeHandler}
          />
          <Input
            value={form.password}
            name="password"
            placeholder="Password"
            type="password"
            onChange={formChangeHandler}
          />
          <Button big anime onClick={loginHandler}>
            Login
          </Button>
        </>
      )}
      <div className="set-login">
        <div className="set_login__action">
          <Button big onClick={setLoginHandler} inverse={!isLoggin}>
            Login
          </Button>
          <Button big onClick={setSignUpHandler} inverse={isLoggin}>
            Sign Up
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AuthPanel;
