import { firebase } from "../../app.js";
import { GetNotificationsByEmail } from "./GetNotificationByEmail.js";

export async function EditNotification(params) {

  const doc = await 

  await firebase
    .firestore()
    .collection("Notifications")
    .doc(params.id)
    .update({
      // pushToken: params.pushToken,
      email: params.email,
      crypto: params.crypto,
      operator: params.operator,
      value: params.value,
      currency: params.currency,
    })
    .catch((e) => {
      console.log(e);
    });
  return (await GetNotificationsByEmail(params.email));
}
