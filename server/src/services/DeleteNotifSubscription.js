import { GetUserByEmail } from "./GetUserByEmail.js";
import { UpdateUser } from "./UpdateUser.js";

export async function DeleteNotifSubscription(email) {
    console.log("dele notif subscription")
    const user = await GetUserByEmail(email);

    console.log("user = ", user)
    user.enabledNotif = false;
    user.pushTokens = [];
    console.log("user after modif = ", user);
    await UpdateUser(user.id, user)
    return (await GetUserByEmail(email));
}