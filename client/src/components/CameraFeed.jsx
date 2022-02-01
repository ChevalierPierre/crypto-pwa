import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

export class CameraFeed extends Component {
  /**
   * Processes available devices and identifies one by the label
   * @memberof CameraFeed
   * @instance
   */
  processDevices(devices) {
    devices.forEach((device) => {
      console.log(device.label);
      this.setDevice(device);
    });
  }

  /**
   * Sets the active device and starts playing the feed
   * @memberof CameraFeed
   * @instance
   */
  async setDevice(device) {
    const { setTakingPic, setPicErrMsg } = this.props;
    try {
      const { deviceId } = device;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { deviceId },
      });
      this.videoPlayer.srcObject = stream;
      this.videoPlayer.play();

      setPicErrMsg("");
    } catch {
        console.log("error: ");
        setTakingPic(false);
        setPicErrMsg("verify you authorized camera");
    }
  }

  /**
   * On mount, grab the users connected devices and process them
   * @memberof CameraFeed
   * @instance
   * @override
   */
  async componentDidMount() {
    const cameras = await navigator.mediaDevices.enumerateDevices();
    this.processDevices(cameras);
  }

  /**
   * Handles taking a still image from the video feed on the camera
   * @memberof CameraFeed
   * @instance
   */
  takePhoto = () => {
    // const { sendFile } = this.props;
    const context = this.canvas.getContext("2d");
    context.drawImage(this.videoPlayer, 0, 0, 200, 200);
    // this.canvas.toBlob(sendFile);
  };

  save = () => {
    const { sendFile } = this.props;
    const context = this.canvas.getContext("2d");
    const imageData = context.getImageData(0, 0, 200, 200);
    // this.canvas.toBlob(sendFile);
    console.log(imageData);
    sendFile(imageData);
  };

  close = async () => {
    const video = document.querySelector("video");

    // A video's MediaStream object is available through its srcObject attribute
    const mediaStream = video.srcObject;

    // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
    const tracks = await mediaStream.getTracks();
    tracks.forEach(async (track) => await track.stop());
    const { setTakingPic } = this.props;
    setTakingPic(false);
  };

  render() {
    const { setTakingPic } = this.props;
    return (
      <Container className="c-camera-feed">
        <div className="c-camera-feed__viewer" style={{ marginTop: 20 }}>
          <video
            ref={(ref) => (this.videoPlayer = ref)}
            width={200}
            heigh={200}
            style={{ backgroundColor: "black", height: 200, width: 200 }}
          />
        </div>
        <Row>
          <Col>
            <Button onClick={this.close}>Back</Button>
          </Col>
          <Col>
            <Button onClick={this.takePhoto}>Take photo!</Button>
          </Col>
          <Col>
            <Button onClick={this.save}>Save</Button>
          </Col>
        </Row>
        <div className="c-camera-feed__stage" style={{ marginTop: 20 }}>
          <canvas width="200" height="200" ref={(ref) => (this.canvas = ref)} />
        </div>
      </Container>
    );
  }
}
