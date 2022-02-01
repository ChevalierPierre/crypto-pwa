import React, { useContext, useEffect, useState } from "react";
import LogoutButton from "./../components/LogoutButton";
// import { useAuth0 } from "@auth0/auth0-react";
import { subscribeUser } from "../subscribtion";
import { getToken } from "../subscribtion";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { NotificationContext } from "../contexts/NotificationContext";
import { Button, Container, Row, Spinner } from "react-bootstrap";
import {
  INotification,
  INotificationForm,
} from "../interfaces/INotificationContext";
import CreateNotifModal from "../components/CreateNotifModal";
import NotifCard from "../components/NotifCard";
import { CryptoContext } from "../contexts/CryptoContext";
import { getSuggestedQuery } from "@testing-library/react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import Footer from "../components/Footer";

export const env = "prod";

interface IProps {}

const Notifications: React.FC<IProps> = () => {
  const { notifications, getNotifications, loadNotif } =
    useContext(NotificationContext);
  const { getCryptos, getCurrencies } = useContext(CryptoContext)
  const { user, getUser } = useContext(AuthenticationContext)
    
  const [form, setForm] = useState<INotificationForm>({
    crypto: "bitcoin",
    operator: ">=",
    value: "20000000",
    currency: "usd",
  });
const [refreshed, setRefreshed] = useState(false)
  useEffect(() => {
   
    if (!refreshed) {
      setRefreshed(true)
      getNotifications();
      getCryptos();
    
      getCurrencies();

    }
    if (!user) {
      getUser();
    }
    // if (currencies.length === 0) getCurrencies();
  });

  return (
    <div className="App">
      <Container fluid className="App-page">
        <Header />
        <NavBar activeKey="/notifications" />
        <Container>
          <Row className="notif-action-row">
            <div className="notif-btn-div">
              <CreateNotifModal title="🛎 Create notification" />
            </div>
          </Row>
        </Container>

        <Button onClick={() => getNotifications()}>refresh</Button>
        {loadNotif && <Spinner animation="border" />}
        <Container style={{minHeight: '70vh', marginBottom: 50}}>
          <Row>
            
            {notifications?.length === 0 && (
              <div>You don't have any notifications yet</div>
            )}
            {notifications?.map((notif: INotification, index) => {
              return (
              // <div>{notif.email}</div>
              <NotifCard notif={notif} key={index} />
              );
            })}
          </Row>
        </Container>
        <Footer />
      </Container>
    </div>
  );
};
export default Notifications;
