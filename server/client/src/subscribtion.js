import axios from "axios";
import { useContext } from "react";
import { AuthenticationContext } from "./contexts/AuthenticationContext";

const convertedVapidKey = urlBase64ToUint8Array(
  "BK-P362ah-2OUax99MjHhWxCCWfII_YpUzTU96S14w76WN9TIqda5bpgkM2JsW-QDNvp62NdnwSgebGxWWnjDtw"
);

const apiDev = "http://localhost:8080";
const apiProd = "http://localhost:8080";
// const apiProd = "https://trading-signal.herokuapp.com";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  // eslint-disable-next-line
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function sendSubscription(subscription) {
  console.log("[SEND SUBSCRIPTION] IN");
  console.log("[SEND SUBSCRIPTION] subscription ======> ", subscription);
  console.log(
    "[SEND SUBSCRIPTION] strigify subscription ======> ",
    JSON.stringify(subscription)
  );
  // const body = {
  //   subscription: subscription,
  //   email: user
  // }
  return fetch(
    `${
      process.env.NODE_ENV === "production" ? apiProd : apiDev
    }/notifications/subscribe`,
    {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

function createSubscription(email, hToken, subscription) {
  console.log("[SEND SUBSCRIPTION] IN");
  console.log("[SEND SUBSCRIPTION] subscription ======> ", subscription);
  console.log(
    "[SEND SUBSCRIPTION] strigify subscription ======> ",
    JSON.stringify(subscription)
  );
  const body = {
    subscription: subscription,
    email: email
  }
  return axios.post(process.env.REACT_APP_ENDPOINT_PROD + '/notifications/suscription', body, {
    headers: {
      authorization: `Bearer ${hToken}`,
    },
    // body: { email: user?.email }!,
  })
  // return fetch(
  //   `${
  //     process.env.NODE_ENV === "production" ? apiProd : apiDev
  //   }/notifications/subscribe`,
  //   {
  //     method: "POST",
  //     body: JSON.stringify(subscription),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
}

export async function getTokenWithSubscription(email, hToken) {
  console.log('[GET TOKEN] ==============> IN')
  let token = undefined;
  if ("serviceWorker" in navigator) {
    await navigator.serviceWorker.ready
      .then(async function (registration) {
        if (!registration.pushManager) {
          return;
        }
        token = await registration.pushManager
          .getSubscription()
          .then(async function (existedSubscription) {
            if (existedSubscription === null) {
              console.log("No subscription detected, make a request.");
              token = await registration.pushManager
                .subscribe({
                  applicationServerKey: convertedVapidKey,
                  userVisibleOnly: true,
                })
                .then(function (newSubscription) {
                  console.log("New subscription added.");
                  createSubscription(email, hToken, newSubscription);
                  console.log("---------------------subscription>", newSubscription)
                  return newSubscription;
                })
                .catch(function (e) {
                  if (Notification.permission !== "granted") {
                    console.log("Permission was not granted.");
                  } else {
                    console.error(
                      "An error ocurred during the subscription process.",
                      e
                    );
                  }
                });
            } else {
              console.log("Existed subscription detected.");
              console.log("---------------------subscription>", existedSubscription)
              return existedSubscription;
            }
          });
          console.log("[GET TOKEN] =========> TOKTOK >", token);
      })
      .catch(function (e) {
        console.error(
          "An error ocurred during Service Worker registration.",
          e
        );
      });
    console.log('[  GET TOKE, ============ token >]', token);
    return token;
  }
}

export async function getToken() {
  console.log('[GET TOKEN] ==============> IN')
  let token = undefined;
  if ("serviceWorker" in navigator) {
    await navigator.serviceWorker.ready
      .then(async function (registration) {
        if (!registration.pushManager) {
          return;
        }
        await registration.pushManager
          .getSubscription()
          .then(async function (existedSubscription) {
            if (existedSubscription === null) {
              console.log("No subscription detected, make a request.");
              await registration.pushManager
                .subscribe({
                  applicationServerKey: convertedVapidKey,
                  userVisibleOnly: true,
                })
                .then(function (newSubscription) {
                  console.log("New subscription added.");
                  console.log("---------------------subscription>", newSubscription)
                  token = newSubscription;
                  return newSubscription;
                })
                .catch(function (e) {
                  if (Notification.permission !== "granted") {
                    console.log("Permission was not granted.");
                  } else {
                    console.error(
                      "An error ocurred during the subscription process.",
                      e
                    );
                  }
                });
            } else {
              console.log("Existed subscription detected.");
              console.log("---------------------subscription>", existedSubscription)
              token = existedSubscription;
              return existedSubscription;
            }
          });
          console.log("[GET TOKEN] =========> TOKTOK >", token);
      })
      .catch(function (e) {
        console.error(
          "An error ocurred during Service Worker registration.",
          e
        );
      });
    console.log('[  GET TOKE, ============ token >]', token);
    return token;
  }
}

export function subscribeUser(email, hToken) {
  console.log("---------_> SUBSCRIBE USER in");
  if ("serviceWorker" in navigator) {
    console.log("service worker is present");
    navigator.serviceWorker.ready
      .then(function (registration) {
        console.log("service worker is ready");
        if (!registration.pushManager) {
          console.log("Push manager unavailable.");
          return;
        }

        registration.pushManager
          .getSubscription()
          .then(function (existedSubscription) {
            if (existedSubscription === null) {
              console.log("No subscription detected, make a request.");
              registration.pushManager
                .subscribe({
                  applicationServerKey: convertedVapidKey,
                  userVisibleOnly: true,
                })
                .then(function (newSubscription) {
                  console.log("New subscription added.");
                  createSubscription(email, hToken, newSubscription);
                })
                .catch(function (e) {
                  if (Notification.permission !== "granted") {
                    console.log("Permission was not granted.");
                  } else {
                    console.error(
                      "An error ocurred during the subscription process.",
                      e
                    );
                  }
                });
            } else {
              console.log("Existed subscription detected.");
              createSubscription(email, hToken, existedSubscription);
            }
          });
      })
      .catch(function (e) {
        console.error(
          "An error ocurred during Service Worker registration.",
          e
        );
      });
  }
}
