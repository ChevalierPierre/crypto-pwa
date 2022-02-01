import { firebase } from "../../app.js";

export async function GetUserByEmail(email) {
  console.log("get user by email ")
  console.log(email)
  const snapshot = await firebase
    .firestore()
    .collection("Users")
    .where("email", "==", email)
    .get();
    const user = { ...snapshot?.docs[0]?.data(), id: snapshot?.docs[0]?.id }
  console.log(user)
return user;
}
