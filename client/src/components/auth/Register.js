import React, { useState, useContext } from "react";
import { Alert, Spinner } from "react-bootstrap";
import {useHistory} from "react-router-dom"
import { UserContext } from "../../context/userContext";

import { useMutation } from "react-query";

import { API } from "../../config/api";

export default function Register() {
  const title = "Register";
  document.title = "DumbMerch | " + title;
  
  let history = useHistory()
  let api = API();
  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {

      e.preventDefault();

      // Data body
      const body = JSON.stringify(form);

      // Configuration Content-type
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      };

      // Insert data user to database
      const response = await api.post("/register", config);

      console.log(response);

      // Notification
      if (response.status == "success") {
        dispatch({
          type: "REGISTER_SUCCESS",
          payload: response.data
        });

        const alert = (
          <Alert variant="success" className="py-1">
            Success, <br/> Plesae wait..<Spinner animation="border" variant="primary" size="sm" className="ms-3" />
          </Alert>
        );
        
        setMessage(alert);
        setForm({
          name: "",
          email: "",
          password: "",
        });
        setTimeout(() => history.push("/"), 2000)
        
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            {response.error.message}
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <div className="d-flex justify-content-center auth-login">
      <div className="card-auth p-md-4 p-3">
        <div
          style={{ fontSize: "36px", lineHeight: "49px", fontWeight: "600" }}
          className="mb-md-2 card-auth-title"
        >
          Register
        </div>
        {message}
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-md-3 form">
            <input
              type="text"
              placeholder="Name"
              value={name}
              name="name"
              onChange={handleChange}
              className="px-3 py-2 mt-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              className="px-3 py-2 my-3 mt-sm-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              className="px-3 py-2"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-login auth-submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
