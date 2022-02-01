import React, { useEffect } from "react";
import Navigation from "./navigation/Navigation";
import "./App.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { Auth0Config } from "./config/auth0";
import { NotificationProvider } from "./contexts/NotificationContext";
import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import { CryptoProvider } from "./contexts/CryptoContext";
// import { onMessage } from "@firebase/messaging";
// import { messaging } from "./database/firebase";

function App() {
  useEffect(() => {}, []);

  return (
    <Auth0Provider
      domain={Auth0Config.domain}
      clientId={Auth0Config.clientId}
      redirectUri={Auth0Config.redirectUri}
      audience={Auth0Config.audience}
      scope={Auth0Config.scope}
      cacheLocation="localstorage"
    >
      <AuthenticationProvider>
        <CryptoProvider>
        <NotificationProvider>
          <Navigation />
        </NotificationProvider>
        </CryptoProvider>
      </AuthenticationProvider>
    </Auth0Provider>
  );
}

export default App;
