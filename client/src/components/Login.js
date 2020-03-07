import React, { useState, useEffect } from "react";
import StartButton from "./StartButton";
import { loginUser } from "../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";

export default function Signup(props) {
  const initialState = {
    username: "",
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
    loginUser(input, props.history, dispatch);
    if (!errors) {
      setInput(initialState);
    }
  };

  const [input, setInput] = useState(initialState);
  return (
    <div className = "container d-flex justify-content-center m-5">
    <form onSubmit={handleSubmit} className = "align-items-center">
    <div className = "form-group">
      <input
        name="username"
        className = "form-control"
        value={input.username}
        onChange={handleChange}
        placeholder="Username...."
      />

      {errors.username ? <span className = "error">{errors.username}</span> : null}
      </div>
      <div className = "form-group">
      <input
      className = "form-control"
        type = "password"
        name="password"
        value={input.password}
        onChange={handleChange}
        placeholder="Password...."
      />
      {errors.password ? <span className = "error">{errors.password}</span> : null}
      </div>
      <div className = "form-group">
      <button className = "btn btn-dark" onClick ={handleSubmit}>Submit</button>
      </div>
    </form>
    </div>
  );
}
