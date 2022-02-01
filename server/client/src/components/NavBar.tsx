import { url } from "inspector";
import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
// import background from './../assets/maxim-hopman-fiXLQXAhCfk-unsplash.jpg'

interface IProps {
    activeKey: string;
}

const NavBar: React.FC<IProps> = ({ activeKey }) => {
  return (
    <Container>
      <Row>
        <Nav variant="tabs" defaultActiveKey={activeKey}>
          <Nav.Item>
            <Nav.Link href="/home">Cryptos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/notifications">
              Notifications
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/profile">
              Profile
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Row>
    </Container>
  );
};

export default NavBar;
