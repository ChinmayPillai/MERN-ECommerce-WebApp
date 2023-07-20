import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ItemContext } from "../../App";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import axios from "axios";

const loginUrl = "http://localhost:3000/login";
const registerUrl = "http://localhost:3000/register";

function Login() {
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cart = useContext(ItemContext);

  const handleJustifyClick = (value: string) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  function loginUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Login\n");
    axios
      .post(loginUrl, { email: email, password: password })
      .then((response) => {
        console.log(response.data);
        if (response.data.user) {
          //cart.setUser(response.data.user);
          localStorage.setItem("token", response.data.token);
          if (response.data.user.name)
            alert(`Logged in as ${response.data.user.name}`);
          location.href = "/";
          //const navigate = useNavigate();
          //navigate("/");
        } else {
          alert("Invalid username or password");
        }
      });
  }

  function registerUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Register\n");
    axios
      .post(registerUrl, { name: name, email: email, password: password })
      .then((response) => {
        console.log(response.data);
        if (response.data.name) {
          alert(`Registration Successful ${response.data.name}`);
          location.href = "/login";
        }
      });
  }

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          {/*
          <div className="text-center mb-3">
            <p>Sign in with:</p>

            <div
              className="d-flex justify-content-between mx-auto"
              style={{ width: "40%" }}
            >
              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="facebook-f" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="twitter" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="google" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="github" size="sm" />
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>
  */}
          <form onSubmit={loginUser}>
            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="form1"
              type="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/*<div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
            />
            <a href="!#">Forgot password?</a>
          </div>*/}

            <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
          </form>
          <p className="text-center">
            Not a member?{" "}
            <a href="#!" onClick={() => handleJustifyClick("tab2")}>
              Register
            </a>
          </p>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab2"}>
          <form onSubmit={registerUser}>
            <MDBInput
              wrapperClass="mb-4"
              label="Name"
              id="form1"
              type="text"
              placeholder="Chinmay Pillai"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/*<MDBInput
            wrapperClass="mb-4"
            label="Username"
            id="form1"
            type="text"
        />*/}
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="form1"
              type="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="form1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="d-flex justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label={
                  <Link to="/terms">
                    I have read and agree to the Terms and Conditions
                  </Link>
                }
              />
            </div>

            <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
          </form>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default Login;
