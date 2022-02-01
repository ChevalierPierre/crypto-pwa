import React, { useContext, useEffect, useState } from "react";
import logo from "./../logo.svg";
import LoginButton from "./../components/LoginButton";
// import { Redirect } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

interface IProps {}

const Login: React.FC<IProps> = () => {
  const { isAuthenticated, user } = useAuth0();
  const {setLoggedUser, createUserIfNeeded} = useContext(AuthenticationContext);
  const [logged, setLogged] = useState(false)
  useEffect(() => {
    if (user && !logged) {
      // createUserIfNeeded();
      setLogged(true);
      setLoggedUser(user);
      // (async () => {

      //   await setLoggedUser(user)

      // })()
    }
  });

  return (
    <div className="App">
      <header className="App-page">
        <img src={logo} className="App-logo" alt="logo" />
        <LoginButton />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* {isAuthenticated && <Redirect to="/home" />} */}
    </div>
  );
};
export default Login;
