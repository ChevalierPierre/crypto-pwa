import { firebase } from "../../app.js";

export async function CreateNotification(params) {
    const collection = firebase.firestore().collection("Notifications");
    await collection
      .doc()
      .set(params)
      .then((res) => {
        console.log("success");
        return true;
      })
      .catch((e) => {
        console.log(e, "error");
        return false;
      });
}