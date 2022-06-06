import { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import { UserContext } from "../context/userContext";

import ImgDumbMerch from "../assets/DumbMerch.png";

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

export default function Auth() {

  const [state] = useContext(UserContext);

  console.log(state);

  const [isRegister, setIsRegister] = useState(false);

  const switchLogin = () => {
    setIsRegister(false);
  };

  const switchRegister = () => {
    setIsRegister(true);
  };

  return (
    <div className="bg-black">
      <Container>
        <Row className="vh-sm-100 d-flex align-items-center auth-container">
          <Col md="6 auth-header">
            <div className="auth-header">
              <img
                src={ImgDumbMerch}
                className="img-fluid auth-img"
              />
              <div className="text-auth-header mt-sm-4">Easy, Fast and Reliable</div>
            </div>
            <p className="text-auth-parag mt-sm-3 ">
              Go shopping for merchandise, just go to dumb merch <br />{" "}
              shopping. the biggest merchandise in <b>Indonesia</b>
            </p>
            <div className="mt-xl-5 auth-btn mt-3">
              <button onClick={switchLogin} className="btn btn-login px-4 px-sm-5">
                Login
              </button>
              <button
                onClick={switchRegister}
                className="btn btn-register px-sm-5 px-4"
              >
                Register
              </button>
            </div>
          </Col>
          <Col md="6" className="auth-input">{isRegister ? <Register /> : <Login />}</Col>
        </Row>
      </Container>
    </div>
  );
}
