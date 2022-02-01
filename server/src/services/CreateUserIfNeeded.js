import { firebase } from "../../app.js";

export async function CreateUserIfNeeded(user) {
  try {
    const snapshot = await firebase
      .firestore()
      .collection("Users")
      .where("email", "==", user.email)
      .get();
    console.log("snapshot", snapshot.docs);
    console.log("snap empty", snapshot.empty);
    if (snapshot.empty) {
      console.log("creating uiser");
      const collection = firebase.firestore().collection("Users");
      await collection
        .doc()
        .set({
          ...user,
          enabledNotif: false,
          pushTokens: [],
          refCurrency: "usd",
        });
    }
  } catch {
    console.log("There was an ERROR ...");
    return;
  }
}
