import React, { useContext, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Modal,
  Nav,
  Row,
} from "react-bootstrap";
import { CryptoContext } from "../contexts/CryptoContext";
import { NotificationContext } from "../contexts/NotificationContext";
import { INotification, INotificationForm } from "../interfaces/INotificationContext";
// import background from './../assets/maxim-hopman-fiXLQXAhCfk-unsplash.jpg'

interface IProps {
  notif: INotification
}

const EditNotifModal: React.FC<IProps> = ({ notif }) => {
  const { editNotification } = useContext(NotificationContext);
  const { cryptos, currencies } = useContext(CryptoContext);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState<INotification>({
    id: notif.id,
    // pushToken: notif.pushToken,
    email: notif.email,
    crypto: notif.crypto,
    operator: notif.operator,
    value: notif.value,
    currency: notif.currency,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = () => {
    editNotification(form);
    handleClose();
  }

  return (
    <>
      <Button onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notify me when:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>
                <FloatingLabel controlId="floatingSelectGrid" label="Crypto">
                  <Form.Select
                    aria-label="Default select example"
                    defaultValue={form.crypto}
                    onChange={(value) =>
                      setForm({ ...form, crypto: value.target.value })
                    }
                  >
                    {cryptos?.map((crypto, index) => (
                      <option key={index} value={crypto.crypto}>{crypto.crypto}</option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingSelectGrid" label="Operator">
                  <Form.Select
                    aria-label="Default select example"
                    defaultValue={form.operator}
                    onChange={(value) =>
                      setForm({ ...form, operator: value.target.value })
                    }
                  >
                    <option value=">=">{">="}</option>
                    <option value="<=">{"<="}</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingInputGrid" label="Value">
                  <Form.Control
                    type="default"
                    placeholder="Enter a value"
                    defaultValue={form.value}
                    onChange={(value) =>
                      setForm({ ...form, value: value.target.value })
                    }
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingSelectGrid" label="Currency">
                  <Form.Select
                    aria-label="Default select example"
                    defaultValue={form.currency}
                    onChange={(value) =>
                      setForm({ ...form, currency: value.target.value })
                    }
                  >
                    {currencies?.map((currency, index) => (
                      <option key={index} value={currency.currency}>{`${
                        currency.symbol
                      } ${currency?.currency?.toUpperCase()}`}</option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {console.log(form)}
          {console.log(form.value.length)}
          <Button variant="primary" onClick={handleSave} disabled={form.value.length === 0}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditNotifModal;
