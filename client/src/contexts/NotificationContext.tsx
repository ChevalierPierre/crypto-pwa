import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

import {
  defaultNotificationValue,
  INotification,
  INotificationContext,
  INotificationForm,
  TCreateNotificationFC,
  TDeleteNotificationFC,
  TEditNotificationFC,
  TGetNotificationsFC,
} from "../interfaces/INotificationContext";
import { getToken, getTokenWithSubscription } from "../subscribtion";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationContext } from "./AuthenticationContext";

export const NotificationContext = createContext<INotificationContext>(
  defaultNotificationValue
);

export const NotificationProvider: React.FC = ({ children }) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const { user: realUser, suscribeToNotifications } = useContext(AuthenticationContext);
  // const { Alerts } = useContext(AlertContext);
  const [notifications, setNotifications] = useState<Array<INotification>>();
  const [loadNotif, setLoadNotif] = useState(false)
  // const { user } = useContext(AuthenticationContext);

  // const setNotifications = (data: any, id: string) => {
  //   const notif: INotification = {
  //     id: id,
  //     pushToken: data.pushToken,
  //     email: data.email,
  //     crypto: data.crypto,
  //     operator: data.operator,
  //     value: data.value,
  //   };
  //   return notif;
  // };

  const getNotifications: TGetNotificationsFC = async () => {
    console.log('get notification');
    setLoadNotif(true);
    const token = await getAccessTokenSilently();

    axios
      .get(process.env.REACT_APP_ENDPOINT_PROD + "/notifications", {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: { email: user?.email }!,
      })
      .then((res: any) => {
        // console.log(res.data);
        setNotifications(res.data);
        return res.data;
      })
      .catch((e) => console.log(e));
      setLoadNotif(false)
    return;
  };

  // const getNotificationsById: TGetNotificationsByIdFC = async (
  //   payload: string
  // ) => {};

  const createNotification: TCreateNotificationFC = async (payload) => {
    console.log("create notif ");
    const token = await getAccessTokenSilently();
    // const pushToken = await getToken();
    if (!realUser?.enabledNotif) {
      console.log('hello -----------------')
      await suscribeToNotifications();
    }

    if (user)
    console.log("ok");
    const body = {
      // pushToken: pushToken,
      email: user?.email,
      crypto: payload.crypto,
      operator: payload.operator,
      value: payload.value,
      currency: payload.currency,
    };
    axios
      .post(process.env.REACT_APP_ENDPOINT_PROD + "/setNotification", body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(async (res: any) => {
        console.log(res.data);
        console.log("success");
        setNotifications(res.data)
      })
      .catch((e: any) => {
        console.log(e);
        console.log("failure");
      });
  };

  const editNotification: TEditNotificationFC = async (payload) => {
    console.log("edit notification payload => ", payload)
    const token = await getAccessTokenSilently();
    axios
      .post(
        process.env.REACT_APP_ENDPOINT_PROD + "/editNotification",
        payload,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res: any) => {
        // console.log(res);
        // setNotifications([]);
        console.log("//////////////////////// response from edit");
        console.log(res.data);
        setNotifications(res.data);
        console.log("success");
      })
      .catch((e: any) => {
        console.log(e);
        console.log("failure");
      });
  };

  const deleteNotification: TDeleteNotificationFC = async (payload) => {
    const token = await getAccessTokenSilently();
    axios
      .post(
        process.env.REACT_APP_ENDPOINT_PROD + "/deleteNotification",
        { id: payload },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res: any) => {
        console.log(res);
        getNotifications();
        console.log("success");
      })
      .catch((e: any) => {
        console.log(e);
        console.log("failure");
      });
  };

  useEffect(() => {
    
  });

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        loadNotif,
        // userNotifications,

        createNotification,
        getNotifications,
        editNotification,
        // getNotificationById,
        // getUserNotifications,
        // editNotification,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
