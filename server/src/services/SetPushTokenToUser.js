import { firebase } from "../../app.js";

export async function SetPushTokenToUser(email, token) {
    console.log("set push token")
  const snapshot = await firebase
    .firestore()
    .collection("Users")
    .where("email", "==", email)
    .get();

    const user = { id: snapshot?.docs[0].id, data: snapshot?.docs[0].data() }
   console.log(user);
    for (let i = 0; i < user?.data?.pushTokens?.length; i++) {
        if (user?.data?.pushTokens[i] === token) {
            console.log("token already exist");
            return;
        }
    }
    user.data.pushTokens.push(token)
    console.log("no subscritption token");
    console.log("user id = ", user.id)
    console.log("user token = ", token)
    await firebase.firestore().collection('Users').doc(user.id).update({
        ...user.data,
        enabledNotif: true
    });
    console.log("user update")
}
