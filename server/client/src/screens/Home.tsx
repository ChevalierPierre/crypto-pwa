import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import CryptoItem from "../components/CryptoItem";
import { CryptoContext } from "../contexts/CryptoContext";
import { ISimplePrice } from "../interfaces/ICryptoContext";
import { useAuth0 } from "@auth0/auth0-react";
import Chart from "react-google-charts";
import { useParams } from "react-router-dom";
import Details from "../components/Details";
import Footer from "../components/Footer";

const axios = require("axios");
export const env = "prod";

interface IProps {}

const Home: React.FC<IProps> = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const [detailBool, setDetailBool] = useState<boolean>(false);
  const [detailedCrypto, setDetailedCrypto] = useState() as any;
  const [marketData, setMarketData] = useState([] as any);
  const {
    simplePrices,
    getSimplePrices,
    currencies,
    getCurrencies,
    getCryptos,
  } = useContext(CryptoContext);
  // const prod: string = "https://trading-signal.herokuapp.com";
  const prod: string = "http://localhost:8080";
  const dev: string = "http://localhost:8080";

  const endpoint: string = process.env.NODE_ENV === "production" ? prod : dev;
  const [refreshed, setRefreshed] = useState(false);
  const params = useParams();
  console.log("params ====== ", params.id);
  useEffect(() => {
    if (!refreshed) {
      setRefreshed(true);
      getSimplePrices();
      getCurrencies();
      getCryptos();
      setDetailBool(false);
    }
    if (params.id && !detailBool) {
      setDetailBool(true);
      // if (!marketData && !detailedCrypto)
      (async () => {
        await getCoinPrices(params.id!);
        await getMarketData(params.id!);
      })();
    }

    return;
  });

  const getCoinPrices = async (coin: string) => {
    const token = await getAccessTokenSilently();
    const body = { coinId: coin };
    const response: any = await axios
      .get(process.env.REACT_APP_ENDPOINT_PROD + "/coinsfetch", {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: body!,
      })
      .catch((err: any) => {
        console.log(err);
      });
    console.log(
      "cryptos getsinglevalue= ",
      response?.data[0].description.en.replace(/(<.*>)/g, "")
    );
    setDetailedCrypto(response?.data[0]);
  };

  const getMarketData = async (coin: string) => {
    const token = await getAccessTokenSilently();
    const body = { coinId: coin };
    const response = await axios
      .get(process.env.REACT_APP_ENDPOINT_PROD + "/marketdata", {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: body!,
      })
      .catch((err: any) => {
        console.log(err);
      });
    console.log("cryptos marketdata= ", [response?.data[0].prices]);
    let temp = [];
    temp.push(["Day", "Value"]);
    for (let i = 0; i < response?.data[0].prices.length; i += 1) {
      temp.push([
        ((i + 1) * 30) / response?.data[0].prices.length.toString(),
        parseInt(response?.data[0].prices[i][1]),
      ]);
    }
    console.log("111111111111111111", temp);
    setMarketData(temp);
  };

  const handleDetails = async (coin: string) => {
    window.location.href += "/" + coin;
    setDetailBool(true);
    console.log("55555 detail bool", detailBool);
  };

  return (
    <div className="App">
      <Container fluid className="App-page">
        <Header />
        <NavBar activeKey="/home" />

        {/* <button onClick={() => getSimplePrice()}>get price</button> */}
        {detailBool ? (
          <Details detailedCrypto={detailedCrypto} marketData={marketData} />
        ) : (
          <Container style={{minHeight:'70vh', marginBottom: 100}}>
            <Row>
              {simplePrices!.map((crypto: ISimplePrice, index: number) => {
                return (
                  // <div>{crypto.eur}</div>

                  <CryptoItem
                    key={index}
                    crypto={crypto}
                    onClick={() => handleDetails(crypto.name)}
                  />
                );
              })}
            </Row>
          </Container>
        )}
        <Footer />
      </Container>
    </div>
  );
};
export default Home;
