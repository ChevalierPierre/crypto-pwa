import CoinGecko from "coingecko-api";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import jwt from "express-jwt";
import {expressJwtSecret} from "jwks-rsa";
import webpush from "web-push";
import bodyParser from "body-parser";
import admin from "firebase-admin";
import serviceAccount from "./trading-signals-19cf4-firebase-adminsdk-pirkr-5ec0deef9c.json";
// import serviceAccount from './trading-signal-dev-firebase-admins.json'
import schedule from "node-schedule";
import {FetchAnalizeGeckoValues} from "./src/services/FetchAnalizeGeckoValues.js";
import {SendNotification} from "./src/services/SendNotification.js";
import {GetNotificationsByEmail} from "./src/services/GetNotificationByEmail.js";
import {CreateNotification} from "./src/services/CreateNotification.js";
import {EditNotification} from "./src/services/EditNotification.js";
import {DeleteNotification} from "./src/services/DeleteNotification.js";
import { GetUserByEmail } from "./src/services/GetUserByEmail.js";
import { CreateUserIfNeeded } from "./src/services/CreateUserIfNeeded.js";
import { SetPushTokenToUser } from "./src/services/SetPushTokenToUser.js";
import { DeleteNotifSubscription } from "./src/services/DeleteNotifSubscription.js";


//Initialize Gecko Client
export const CoinGeckoClient = new CoinGecko();

//Initialize Cryptos fetch all cryptos fetch on Gecko
export const cryptos = [
  "bitcoin",
  "ethereum",
  "ripple",
  "zcash",
  "monero",
  "solana",
];

export const cryptos_with_logo = [
  { crypto: "bitcoin", logo: "https://assets.coingecko.com/coins/images/1/thumb_2x/bitcoin.png" },
  { crypto: "ethereum", logo: "https://assets.coingecko.com/coins/images/279/thumb_2x/ethereum.png" },
  { crypto: "ripple", logo: "https://assets.coingecko.com/coins/images/44/thumb_2x/xrp-symbol-white-128.png" },
  { crypto: "zcash", logo: "https://assets.coingecko.com/coins/images/486/small/circle-zcash-color.png" },
  { crypto: "monero", logo: "https://assets.coingecko.com/coins/images/69/small/monero_logo.png" },
  { crypto: "solana", logo: "https://assets.coingecko.com/coins/images/4128/small/Solana.jpg" },
];

export const currencies_with_symbol = [
  { currency: 'usd', symbol: '$' },
  { currency: 'eur', symbol: '€' },
  { currency: 'jpy', symbol: '¥' },
]

//Initialize Cryptos fetch all cryptos fetch on Gecko
export const currencies = ["usd", "eur", "jpy"];

//Initialize global to store gecko values to reduce the amount of requests.
export let crypto_values = [];

//Initialize a global to store gecko single crypto value for modal
export let crypto_single_value = [];

//Initialize a global to store gecko single crypto value for modal
export let market_data_value = [];

//Initialize firebase admin
export const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

//Initilize dotenv
dotenv.config();

//Initialize webpush module with vapid key
webpush.setVapidDetails(
    "mailto:nn@gmail.org",
    process.env.PUBLIC_VAPID,
    process.env.PRIVATE_VAPID
);

//Iniltialize express server
const app = express();
var port = process.env.PORT || 8080;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

//Initialize jwt protection
var jwtCheck = jwt({
    secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.JWKSURI,
    }),
    audience: process.env.AUDIENCE,
    issuer: process.env.ISSUER,
    algorithms: [process.env.ALGORITHMS],
});

//Start jobs
const job = schedule.scheduleJob("*/5 * * * * *", async () => {
    FetchAnalizeGeckoValues()
});



// Unprotected Routes
app.get("/", (req, res) => {
    console.log("Hello World from local");
    res.send("Hello world");
});

app.get("/unprotected", function (req, res) {
    res.send("It works");
});


// Token verification
app.use(jwtCheck);

// Protected Routes


/* User */

app.post("/createUserIfNeeded", async (req, res) => {
  console.log('////////////////// create user if needed')
  const user = req.body;
  console.log('body= ', user);
  await CreateUserIfNeeded(user);
  res.status(200);
})

app.get('/user', async (req, res) => {
  const email = req.query?.email;
  console.log("query = ", req.query)
  if (!email) return ;

  res.send(await GetUserByEmail(email)).catch();
})



app.post("/user/updatePic", async (res, req) => {
  console.log("update profile picture ")
  console.log("body = ", req.body)
});

app.post("/notifications/subscribe", (req, res) => {
  const subscription = req.body;
  SendNotification({
    title: `Welcome to Trading Signals!`,
    body: `We are happy to see that we have a new member here! 🙂`,
    subscription: subscription,
  });
  res.status(200).json({ success: true });
});



app.post("/notification", function (req, res) {
  console.log("notify");
  SendNotification({
    title: `Yeahh this is a notification`,
    body: `clap, clap, clap`,
    subscription: req.body,
  });

  res.status(201).json({});
});

app.get("/protected", function (req, res) {
    res.send("Secured Resource");
});

app.get("/simplePrice", async function (req, res) {
    // try {
    //   const data = await CoinGeckoClient.simple.price({
    //     ids: req.query.ids.join(","),
    //     vs_currencies: req.query.vs_currency.join(","),
    //   });
    //   console.log(data);
    //   res.send(data);
    // } catch (err) {
    //   console.log(err);
    // }
    console.log(crypto_values)
    res.send(crypto_values)
});

app.get("/marketdata", async function (req, res) {
    try {
        console.log("marketdatasfetch", req.query.coinId)
        const response = await CoinGeckoClient.coins.fetchMarketChart(req.query.coinId,{days:"30"}
        );
        console.log(response.data);
        market_data_value.splice(0, market_data_value.length);
        market_data_value.push({...response.data});
        console.log('marketdata', market_data_value)
        res.send(market_data_value);
    } catch (err) {
        console.log(err);
    }
});

app.get("/coinsfetch", async function (req, res) {
    try {
        console.log("coincsfetch", req.query.coinId)
        const response = await CoinGeckoClient.coins.fetch(req.query.coinId
        );
        console.log(response.data);
        crypto_single_value.splice(0, crypto_single_value.length);
        crypto_single_value.push({...response.data});
        console.log('coinsfecth:', crypto_single_value)
        res.send(crypto_single_value);
    } catch (err) {
        console.log(err);
    }
});

app.get("/coins-list", async function (req, res) {
    console.log("[get coins list] begin");
    try {
        const data = await CoinGeckoClient.coins.list({include_platform: true});
        console.log(data);
        res.send(data);
    } catch {
        res.send("error");
    }
});

/* Cryptos & currencies */

app.get('/cryptos', (req, res) => {
  res.send(cryptos_with_logo)
});

app.get('/currencies', (req, res) => {
  res.send(currencies_with_symbol);
});

/* Notifications */

app.post("/notifications/suscription", async (req, res) => {
  console.log("subscription: ---------")
  const email = req.body?.email;
  const subscription = req.body.subscription;

  await SetPushTokenToUser(email, subscription);
  SendNotification({
    title: `You registered a new navigator for notification`,
    body: `We are happy to see that we have a new member here! 🙂`,
    subscription: subscription,
  });
  res.send(await GetUserByEmail(email))
});

app.post("/notifications/deteleSubscription", async (req, res) => {
  console.log("delete subscription")
  const email = req.body?.email;
  console.log("email = ", email)
  await DeleteNotifSubscription(email);
  const user = await GetUserByEmail(email)
  console.log(user)
  res.send(user)
})

app.get("/notifications", async function (req, res) {

  console.log('get notification')
  const email = req.query.email;
  if (!email) {
    res.send([]);
    return;
  }
  const notif = await GetNotificationsByEmail(email);
  res.send(notif);
});

app.post("/setNotification", async (req, res) => {
  const body = req.body;

  await CreateNotification(body)
  const notif = await GetNotificationsByEmail(body?.email)
  res.send(notif);
});

app.post("/editNotification", async (req, res) => {
  console.log('edit notif')
  const body = req.body;
  console.log(body)
  const notif = await EditNotification(body);
  console.log("notif = ", notif);
  res.send(notif);
});

app.post("/deleteNotification", async (req, res) => {
  console.log("delete notif");
  const id = req.body.id;
  console.log("id = ", id);
  res.send(await DeleteNotification(id));
});

app.get("/protected2", function (req, res) {
    res.send("Secured Resource2");
});

console.log("server listening on port: ", port);
app.listen(port);
