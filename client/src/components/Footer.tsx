import { useAuth0 } from "@auth0/auth0-react";
import { url } from "inspector";
import React from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
// import background from './../assets/maxim-hopman-fiXLQXAhCfk-unsplash.jpg'

interface IProps {}

const Footer: React.FC<IProps> = () => {
  const { user } = useAuth0();
  return (
    <Container className="footer">
        <div style={{height: 1, width: '100%', backgroundColor: 'grey'}} />
      <Row className="footer-row-one">
        <h5>Trading signals</h5>
        
      </Row>
      
    </Container>
  );
};

export default Footer;
