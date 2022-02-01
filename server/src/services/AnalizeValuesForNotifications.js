import { crypto_values } from "../../app.js";
import { DeleteNotification } from "./DeleteNotification.js";
import { GetUserByEmail } from "./GetUserByEmail.js";
import { SendNotification } from "./SendNotification.js";

export function AnalizeValuesForNotifications(notifs) {
  for (let i = 0; i < crypto_values.length; i++) {
    notifs?.map(async (doc) => {
      if (
        doc.data().crypto === crypto_values[i].name &&
        doc.data().operator === ">=" &&
        parseFloat(doc.data().value) <= crypto_values[i][doc.data().currency]
      ) {
        console.log(
          "UPPER its ok you can send notif and delete this notif from db"
        );
        const user = await GetUserByEmail(doc.data().email);
        console.log("user for notif = ", user);
        user?.pushTokens.map((token) => {
          SendNotification({
            title: `🛎 ${crypto_values[i].name} is higher than ${
              doc.data().value
            }`,
            body: `${crypto_values[i].name} is now ${crypto_values[i].usd}`,
            subscription: token,
            url: "https://nostalgic-northcutt-170a0d.netlify.app/home/" + crypto_values[i].name,
          });
        });
        DeleteNotification(doc.id);
      } else if (
        doc.data().crypto === crypto_values[i].name &&
        doc.data().operator === "<=" &&
        parseFloat(doc.data().value) >= crypto_values[i][doc.data().currency]
      ) {
        console.log(
          "LOWER its ok you can send notif and delete this notif from db"
        );
        const user = await GetUserByEmail(doc.data().email);
        console.log("user for notif = ", user);
        user?.pushTokens.map((token) => {
          SendNotification({
            title: `🛎 ${crypto_values[i].name} is higher than ${
              doc.data().value
            }`,
            body: `${crypto_values[i].name} is now ${crypto_values[i].usd}`,
            subscription: token,
            url: "https://nostalgic-northcutt-170a0d.netlify.app/home/" + crypto_values[i].name,
          });
        });
        DeleteNotification(doc.id);
      }
    });
  }
}
