import React, { useState, useEffect } from "react";
import StartButton from "./StartButton";
import { signupUser } from "../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";

export default function Signup(props) {
  const initialState = {
    username: "",
    email: "",
    password: ""
  };
  const errorsFromBackend = useSelector(state => state.user.errors);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (JSON.stringify(errors) !== JSON.stringify(errorsFromBackend)) {
      setErrors(errorsFromBackend);
    }
  }, [errorsFromBackend]);
  const handleChange = e => {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    signupUser(input, props.history, dispatch);
    if (!errors) {
      setInput(initialState);
    }
  };

  const [input, setInput] = useState(initialState);
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={input.username}
        onChange={handleChange}
        placeholder="Username...."
      />

      {errors.username ? <span className = "error">{errors.username}</span> : null}
      <input
        name="email"
        value={input.email}
        onChange={handleChange}
        placeholder="Email...."
      />
      {errors.email ? <span className = "error">{errors.email}</span> : null}
      <input
        name="password"
        value={input.password}
        onChange={handleChange}
        placeholder="Password...."
      />
      {errors.password ? <span className = "error">{errors.password}</span> : null}
      <StartButton onClick ={handleSubmit}>Submit</StartButton>
    </form>
  );
}
