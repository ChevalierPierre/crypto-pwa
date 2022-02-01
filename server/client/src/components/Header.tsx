import { useAuth0 } from "@auth0/auth0-react";
import { url } from "inspector";
import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
// import background from './../assets/maxim-hopman-fiXLQXAhCfk-unsplash.jpg'

interface IProps {}

const Header: React.FC<IProps> = () => {
  const { user } = useAuth0();
  return (
    <Container className="header">
      <Row className="header-row-one">
        <h1>Trading signals</h1>
        
      </Row>
      <Row className="header-row-two">
      {/* <h2>{`Welcome ${user?.name}`}</h2> */}
        {/* <Container> */}
        
        {/* </Container> */}
        {/* <Col className="header-col-action" onClick={() => console.log('hello world from header actions')}>
            <button style={{}}>Cryptos</button>
        </Col>
        <Col className="header-col-action" onClick={() => alert(1)}>
            <button style={{}}>Notifications</button>
        </Col> */}
      </Row>
    </Container>
  );
};

export default Header;
