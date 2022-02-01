import React, { useContext, useEffect, useState } from "react";
import LogoutButton from "./../components/LogoutButton";
// import { useAuth0 } from "@auth0/auth0-react";
import { subscribeUser } from "../subscribtion";
import { getToken } from "../subscribtion";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { NotificationContext } from "../contexts/NotificationContext";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  INotification,
  INotificationForm,
} from "../interfaces/INotificationContext";
import CreateNotifModal from "../components/CreateNotifModal";
import NotifCard from "../components/NotifCard";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import { useAuth0 } from "@auth0/auth0-react";
import { url } from "inspector";
import { CameraFeed } from "../components/CameraFeed";
import Footer from "../components/Footer";

export const env = "prod";

interface IProps {}

const Profile: React.FC<IProps> = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const {
    user: realUser,
    getUser,
    deleteNotifSubscription,
    suscribeToNotifications,
    updateProfilePic,
  } = useContext(AuthenticationContext);
  const [takingPic, setTakingPic] = useState(false);
  const [enableNotif, setEnableNotif] = useState(false);
  const [coords, setCoords] = useState({ latitude: "", longitude: "" });
  const [picErrMsg, setPicErrMsg] = useState("");

  useEffect(() => {
    if (!realUser) {
      // setRefreshed(true);
      getUser();
    }
  });

  console.log("real user = ", realUser);

  const handleEnabledNotif = async (value: any) => {
    console.log(value);
    if (realUser?.enabledNotif) {
      //delete notif
      console.log("delete subscription");
      await deleteNotifSubscription();
    } else {
      //suscribe to notif
      suscribeToNotifications();
    }
  };

  const uploadImage = async (file: any) => {
    const formData = new FormData();
    console.log(file);
    console.log("send image to server");
    formData.append("file", file);
    console.log(formData);
    // console.log(formData)
    updateProfilePic(file);
    // Connect to a seaweedfs instance
  };

  // function geoFindMe() {

  //   const status = document.querySelector('#status');
  //   const mapLink = document.querySelector('#map-link');

  //   mapLink.href = '';
  //   mapLink.textContent = '';

  //   function success(position) {
  //     const latitude  = position.coords.latitude;
  //     const longitude = position.coords.longitude;

  //     status.textContent = '';
  //     mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  //     mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
  //   }

  //   function error() {
  //     status.textContent = 'Unable to retrieve your location';
  //   }

  //   if(!navigator.geolocation) {
  //     status.textContent = 'Geolocation is not supported by your browser';
  //   } else {
  //     status.textContent = 'Locating…';
  //     navigator.geolocation.getCurrentPosition(success, error);
  //   }

  // }

  return (
    <div className="App">
      <Container fluid className="App-page">
        <Header />
        <NavBar activeKey="/profile" />

        <Container style={{ minHeight: "70vh", marginBottom: 50 }}>
          <Row>
            <Col sm={3}>
              <img
                src={realUser?.picture}
                alt="pic"
                style={{ maxHeight: 100, maxWidth: 100 }}
              />
              <div style={{ height: 20 }} />
              {!takingPic && (
                <div>
                  <Button onClick={() => setTakingPic(true)}>
                    Edit picture
                  </Button>
                  <div>{picErrMsg}</div>
                </div>
              )}
            </Col>
            {takingPic ? (
              <Col>
                <CameraFeed
                  sendFile={uploadImage}
                  setTakingPic={setTakingPic}
                  setPicErrMsg={setPicErrMsg}
                />
              </Col>
            ) : (
              <Col>
                <h1>{realUser?.name}</h1>
                <p>{realUser?.email}</p>
                {/* <Form> */}
                <Form.Switch
                  type="switch"
                  id="custom-switch"
                  onChange={(value) => {
                    handleEnabledNotif(value.target.value);
                  }}
                  checked={realUser?.enabledNotif}
                  label="Enable notifications"
                />
                {/* <Form.Switch
                  type="switch"
                  id="loc-switch"
                  onChange={(value) => {
                    navigator.geolocation.getCurrentPosition();
                  }}
                  checked={realUser?.enabledNotif}
                  label="Enable notifications"
                /> */}
                {/* </Form> */}

                <div style={{ height: 40 }} />

                {"geolocation" in navigator ? (
                  <div>Geolocation is available</div>
                ) : (
                  <div>Geo is not available</div>
                )}
                <Button
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        setCoords({
                          latitude: position.coords.latitude.toString(),
                          longitude: position.coords.longitude.toString(),
                        });
                      },
                      (error) => {
                        setCoords({
                          latitude: "Unable to retreive position",
                          longitude: "Unable to retreive position",
                        });
                      }
                    );
                  }}
                  id="find-me"
                >
                  Show my location
                </Button>
                <div>Latitude: {coords?.latitude}</div>
                <div>Latitude: {coords.longitude}</div>

                {console.log(user)}
                <Row style={{ height: "20vh" }} />

                <Row>
                  <Col>
                    <LogoutButton />
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
        </Container>
        <Footer />
      </Container>
    </div>
  );
};
export default Profile;
