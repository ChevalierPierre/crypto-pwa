import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { Col, Container, Row, Image } from "react-bootstrap";
import Chart from "react-google-charts";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { CryptoContext } from "../contexts/CryptoContext";

export const env = "prod";

interface IProps {
  detailedCrypto: any;
  marketData: any;
}

const Details: React.FC<IProps> = ({ detailedCrypto, marketData }) => {
  const { simplePrices } = useContext(CryptoContext);
  const params = useParams();

  useEffect(() => {});

  const getCryptoValue = () => {
    for (let i = 0; i < simplePrices?.length; i++) {
      if (simplePrices[i].name === params.id) {
        return simplePrices[i].usd;
      }
    }
  };
  var parser = new DOMParser();

  console.log("----------- image gecko", detailedCrypto?.image);
  return (
    <Container>
      <Row>
        <Col>
          {detailedCrypto?.image.large !== "" ? (
            <Row className="mb-3 mt-3 pb-3 pt-3">
              <Col>
                <Image src={detailedCrypto?.image.large} />
              </Col>
            </Row>
          ) : null}
          {detailedCrypto?.name !== "" ? (
            <Row className="mb-3 mt-3 pb-3 pt-3">
              <h1>{detailedCrypto?.name}</h1>
            </Row>
          ) : null}
          <Row>
            <Col>{`Actual value ${getCryptoValue()}$ USD`}</Col>
          </Row>
        </Col>

        {/*<Row>
                            <h3 className="d-flex justify-content-md-center">
                                Description
                            </h3>
                        </Row>
                        {description !== '' ? (
                            <Row>
                                <Col className="d-flex justify-content-md-center">
                                    {detailedCrypto?.description}
                                </Col>
                            </Row>
                        ) : null}*/}

        {/* </Col> */}

        <Col style={{ justifyContent: "center", alignItems: "center", display: 'flex', backgroundColor: '' }}>
          <Chart
            width={"100%"}
            height={"80%"}
            chartType="Bar"
            loader={<div>30 days value chart</div>}
            data={marketData}
            options={{
              legend: "last 30 days value in USD",
            }}
            rootProps={{ "data-testid": "1" }}

          />
        </Col>
      </Row>
      <Row style={{height: 100}} />
      <Row>
        {detailedCrypto?.description['en'] !== "" ? (

                <Row style={{textAlign: 'start'}}>
                  <h2>Description:</h2>
                  <div style={{height: 20}}/>
                  <div style={{color: 'grey'}} dangerouslySetInnerHTML={{__html: detailedCrypto?.description['en']}} />
                  {/* <div>{parser?.parseFromString(detailedCrypto?.description['en'], 'text/xml')!}</div> */}
                </Row>
            ) : null}
      </Row>
      {/* <Row>
        {detailedCrypto?.genesis_date !== "" ? (

                <Row>
                  <h3>Origin</h3>
                  <Col>{detailedCrypto?.genesis_date}</Col>
                </Row>
            ) : null}
      </Row> */}

<Row style={{height: 100}} />
    </Container>
  );
};
export default Details;
