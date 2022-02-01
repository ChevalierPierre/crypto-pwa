import { url } from "inspector";
import React, { useContext } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { getImpliedNodeFormatForFile } from "typescript";
import { CryptoContext } from "../contexts/CryptoContext";
import { INotification } from "../interfaces/INotificationContext";
import DeleteNotifModal from "./DeleteNotifModal";
import EditNotifModal from "./EditNotifModal";
// import background from './../assets/maxim-hopman-fiXLQXAhCfk-unsplash.jpg'

interface IProps {
  notif: INotification;
}

const NotifCard: React.FC<IProps> = ({ notif }) => {
  const { cryptos, currencies } = useContext(CryptoContext);

  const getLogo = (crypto: string) => {
    for (let i = 0; i < cryptos!.length; i++) {
      if (cryptos![i].crypto === crypto) return i;
    }
  };

  const getSymbol = (currency: string) => {
    for (let i = 0; i < currencies!.length; i++) {
      if (currencies![i].currency === currency) return i;
    }
  };

  console.log("cryptos ============+==>", cryptos)

  return (
    <Container className="notif-card">
      <Row
        style={{
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Col md={1} style={{}}>
          <img
            src={cryptos[getLogo(notif.crypto)!]?.logo}
            alt={notif.id}
            style={{ height: 50, width: 50 }}
          />
        </Col>
        <Col md={2}>{notif.crypto}</Col>
        <Col md={1}>{notif.operator}</Col>
        <Col md={3}>{notif.value}</Col>
        <Col md={2}>
          {currencies[getSymbol(notif.currency)!]?.symbol +
            " " +
            notif?.currency?.toUpperCase()}
        </Col>
        <Col />
        <Col md={2}>
          <Row style={{}}>
            <Col>
              <EditNotifModal notif={notif} />
            </Col>
            <Col>
              <DeleteNotifModal notif={notif} />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default NotifCard;
