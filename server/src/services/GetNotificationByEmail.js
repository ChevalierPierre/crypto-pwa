import { firebase } from "../../app.js";

export async function GetNotificationsByEmail(email) {
    console.log("get notif by email")
    const snapshot = await firebase
        .firestore()
        .collection("Notifications")
        .where("email", "==", email)
        .get();

    const notifications = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    console.log(notifications)
    return notifications;
}
