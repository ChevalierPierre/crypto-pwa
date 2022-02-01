import React, { useContext, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { CryptoContext } from "../contexts/CryptoContext";
import CreateNotifModal from "./CreateNotifModal";

// import background from './../assets/maxim-hopman-fiXLQXAhCfk-unsplash.jpg'

interface IProps {
  crypto: any;
  onClick: any;
}

const CryptoItem: React.FC<IProps> = ({ crypto, onClick }) => {
  const { currencies } = useContext(CryptoContext);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("usd");
  const cur: any = currencies;
  console.log("cur ==> ", cur);

  const getSymbol = (currency: string) => {
    for (let i = 0; i < currencies!.length; i++) {
      if (currencies![i].currency === currency) return i;
    }
  };

  return (
    <Container className="card2 shadow">
      <Row onClick={() => onClick(crypto.name)} style={{ height: "50%" }}>
        <Col style={{ alignItems: "center" }}>
          <img
            src={crypto.image}
            alt={crypto.name}
            style={{ height: 50, width: 50 }}
          />
          <h4>{crypto.name.toUpperCase()}</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          {
            <b>
              {`${crypto[selectedCurrency]} ${
                currencies[getSymbol(selectedCurrency)!]?.symbol
              }`}
            </b>
          }
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col>
          <CreateNotifModal
            title={"🛎"}
            crypto={crypto.name}
            currency={selectedCurrency}
          />
        </Col>
        <Col />
        <Col>
          <Form.Select
            aria-label="Default select example"
            defaultValue={selectedCurrency}
            onChange={(value) => setSelectedCurrency(value.target.value)}
          >
            {currencies?.map((currency, index) => (
              <option value={currency.currency}>{`${
                currency.symbol
              } ${currency.currency.toUpperCase()}`}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>
    </Container>
  );
};

export default CryptoItem;
