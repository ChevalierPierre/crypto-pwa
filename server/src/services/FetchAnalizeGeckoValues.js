import { AnalizeValuesForNotifications } from "./AnalizeValuesForNotifications.js";
import { FetchGeckoValues } from "./FetchGeckoValues.js";
import { firebase } from "../../app.js";

export async function FetchAnalizeGeckoValues() {
  console.log("fetch and analize gecko values");
  FetchGeckoValues();
  const collection = firebase.firestore().collection("Notifications");
  const res = await collection.get().catch(() => {
    return;
  });
  AnalizeValuesForNotifications(res?.docs)
}
