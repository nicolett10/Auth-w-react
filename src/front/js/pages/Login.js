import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import land from "../../img/land.jpg";

const Login = () => {
  const style = {
    background: `url(${land})`, 
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
  };

  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.login(email, password, navigate);
  };

  return (
    <>
      <section id="login pt-5" style={style}>
        <div className="contenedorPrincipal pt-5 pb-5" id="contenedorPrincipal">
          <div className="container-main col-md-5 col-10 m-auto">
            <div className=" row text my-3">
              <div className="messageLogin text-center" style={{color:"#904481"}}>Login</div>
            </div>
            {store.token && store.token !== "" && store.token !== undefined ? (
              "You are logged in "
            ) : (
              <form onSubmit={handleSubmit}>
                <div className=" col-8 mx-auto mb-4" style={{color:"#904481"}}>
                  Email
                  <input
                    className="form-control"
                    type="text"
                    value={email}
                    name="email"
                    id="emailLogin"
                    placeholder="Enter Email..."
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-8 mx-auto mb-5"style={{color:"#904481"}}>
                  {" "}
                  Password
                  <input
                    type="password"
                    name="password"
                    value={password}
                    className="form-control"
                    id="passwordLogin"
                    placeholder="Enter Password..."
                    autoComplete="off"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {store.errorMessage && (
                  <div className="row ">
                    <div className="col-10 bg-danger text-white p-3 mx-auto d-flex justify-content-center">
                      Email and password are not valid
                    </div>
                  </div>
                )}

                <div className="mb-4 text-center">
                  <button
                
                    className="btn"
                    style={{ backgroundColor: "#904481", color: "white" }}
                  >
                    Login
                  </button>
                </div>
                <div className="sign mb-4 text-center" style={{textDecoration:"none"}}>
                  <Link to="/signup" className="link text-decoration-none">
                    Create account
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
