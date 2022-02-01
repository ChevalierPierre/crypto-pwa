import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

interface IProps {}

const LoginButton: React.FC<IProps> = () => {
  const { loginWithRedirect, loginWithPopup } = useAuth0();
  // const { createUserIfNeeded } = useContext(AuthenticationContext);

  return (
    <button onClick={ () => { 
      loginWithRedirect(); 
    }}>Log In</button>
  );
};

export default LoginButton;
