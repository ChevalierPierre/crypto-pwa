import { firebase } from "../../app.js";

export async function UpdateUser(id, payload) {
  try {
    console.log("update user");
    await firebase.firestore().collection("Users").doc(id).update({
      name: payload.name,
      given_name: payload.given_name,
      nickname: payload.nickname,
      email: payload.email,
      email_verified: payload.email_verified,
      enabledNotif: payload.enabledNotif,
      family_name: payload.family_name,
      locale: payload.locale,
      picture: payload.picture,
      pushTokens: payload.pushTokens,
      refCurrency: payload.refCurrency,
      sub: payload.sub,
      updated_at: payload.updated_at,
    });
    return true;
  } catch {
    console.log("error");
    return false;
  }
}
