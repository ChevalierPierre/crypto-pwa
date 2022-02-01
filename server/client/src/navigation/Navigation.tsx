import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./../screens/Login";
import Home from "./../screens/Home";
import Details from "./../screens/Home";
import { useAuth0 } from "@auth0/auth0-react";
import Notifications from "../screens/Notifications";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import Profile from "../screens/Profile";
// import { Redirect } from 'react-router-dom';

interface IProps {}

const Navigation: React.FC<IProps> = () => {
  const { isAuthenticated } = useAuth0(); //user
  const { user, deleteNotifSubscription } = useContext(AuthenticationContext);


  useEffect(() => {
    console.log("Check if enable sub")
    console.log("user = ", user);
    console.log('permission = ', Notification.permission)
    if (Notification.permission !== "granted" && user?.enabledNotif) {
      console.log(('SHOULD DELE SUBSCRIPTION'))
      deleteNotifSubscription()
    }
  })

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* must be protected */}
        <Route path="/home" element={<Home />} >
            
        </Route>
        <Route path="/home/:id" element={<Details />} />
        <Route path='/notifications' element={<Notifications/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
};
export default Navigation;
