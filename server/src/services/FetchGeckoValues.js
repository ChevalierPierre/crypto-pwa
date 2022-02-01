import {crypto_values, currencies, cryptos, cryptos_with_logo} from "../../app.js";
import {CoinGeckoClient} from "../../app.js";

export async function FetchGeckoValues() {
    try {
        const response = await CoinGeckoClient.simple.price({
            ids: cryptos.join(","),
            vs_currencies: currencies.join(","),
        });
        crypto_values.splice(0, crypto_values.length);
        // const collection = admin.firestore().collection("Logos");
        // const doc = await collection.get();
        // const pic = doc.docs[0]._fieldsProto;
        for (let i = 0; i < cryptos.length; i++) {
            crypto_values.push({
                name: cryptos[i],
                ...response.data[cryptos[i]],
                image: cryptos_with_logo[i].logo,
            });
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}