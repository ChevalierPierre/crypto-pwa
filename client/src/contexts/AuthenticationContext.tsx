import { useAuth0, User } from "@auth0/auth0-react";
import axios from "axios";
import { createContext, useState } from "react";
import {
  defaultAuthenticationValue,
  IAuthenticationContext,
  IUser,
  TCreateUserIfNeededFC,
  TDeleteNotifSubscriptionFC,
  TGetUserFC,
  // IUser,
  TSetLoggedUserFC,
  TSuscribeToNotificationFC,
  TUpdateProfilePicFC,
} from "../interfaces/IAuthenticationContext";
import { getToken } from "../subscribtion";

export const AuthenticationContext = createContext<IAuthenticationContext>(
  defaultAuthenticationValue
);

export const AuthenticationProvider: React.FC = ({ children }) => {
  const { getAccessTokenSilently, user: authUser } = useAuth0();
  const [user, setUser] = useState<IUser>();

  const setLoggedUser: TSetLoggedUserFC = async (payload) => {
    console.log("////////////////set logged user");
    await createUserIfNeeded();
    console.log("salut bb");
    console.log(user);
    window.location.href = window.location.origin + "/home";
  };

  const createUserIfNeeded: TCreateUserIfNeededFC = async () => {
    const token = await getAccessTokenSilently();
    console.log("aiajiaisiaisiajsiajsijasjiajs");
    axios
      .post(
        process.env.REACT_APP_ENDPOINT_PROD + "/createUserIfNeeded",
        authUser,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          // body: { email: user?.email }!,
        }
      )
      .then((res: any) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch(() => console.log("error"));
  };

  const suscribeToNotifications: TSuscribeToNotificationFC = async () => {
    const pushToken = await getToken();
    console.log('push token ========= ', pushToken)
    const token = await getAccessTokenSilently();
    const body = {
      subscription: pushToken,
      email: authUser?.email,
    };
    axios
      .post(
        process.env.REACT_APP_ENDPOINT_PROD + "/notifications/suscription",
        body,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          // body: { email: user?.email }!,
        }
      )
      .then((res: any) => {
        console.log("resssssssss = " + res.data);
        setUser(res.data);
      });
  };

  const getUser: TGetUserFC = async () => {
    console.log("get user -----");
    const token = await getAccessTokenSilently();

    axios
      .get(process.env.REACT_APP_ENDPOINT_PROD + "/user", {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: { email: authUser?.email }!,
      })
      .then((res: any) => {
        // console.log(res.data);
        setUser(res.data);
        return res.data;
      })
      .catch((e) => console.log(e));
  };

  const deleteNotifSubscription: TDeleteNotifSubscriptionFC = async () => {
    console.log("delete sub");
    const token = await getAccessTokenSilently();

    const body = {
      email: authUser?.email,
    };

    axios
      .post(
        process.env.REACT_APP_ENDPOINT_PROD +
          "/notifications/deteleSubscription",
        body,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res: any) => {
        setUser(res.data);
      });
  };

  const updateProfilePic: TUpdateProfilePicFC = async (payload) => {
    const body = { formData: payload };
    const token = await getAccessTokenSilently();
    console.log(body)
    axios.post(process.env.REACT_APP_ENDPOINT_PROD + '/user/updatePic', body, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res: any) => {
      console.log(res)
    }).catch((e) => console.log(e))
  }

  return (
    <AuthenticationContext.Provider
      value={{
        user: user,
        setLoggedUser,
        createUserIfNeeded,
        suscribeToNotifications,
        getUser,
        deleteNotifSubscription,
        updateProfilePic,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
