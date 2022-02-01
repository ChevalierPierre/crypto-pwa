import { firebase } from "../../app.js";

export async  function DeleteNotification(id) {
  await firebase.firestore().collection("Notifications").doc(id).delete();
}
