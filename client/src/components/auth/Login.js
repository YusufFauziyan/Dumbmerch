import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";

// Import useMutation
import { useMutation } from "react-query";

// Import API config
import { API } from "../../config/api";

export default function Login() {
  const title = "Login";
  document.title = "DumbMerch | " + title;

  let history = useHistory();
  let api = API();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

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

      // Configuration
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      };

      // Insert data for login process
      const response = await api.post("/login", config);

      console.log(response);

      // Checking process
      if (response.status == "success") {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data,
        });

        // Status check
        if (response.data.status == "admin") {
          history.push("/complain-admin");
        } else {
          history.push("/");
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      } else if(response.state) {

      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            {response.message}
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
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
          className="mb-md-3 card-auth-title"
        >
          Login
        </div>
        {message}
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-md-3 form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
              className="px-3 py-2 mt-sm-3"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
              className="px-3 py-2 mt-sm-3 my-3"
            />
          </div>
          <div className="d-grid gap-2 mt-2">
            <button className="btn btn-login auth-submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
