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
import { NotificationContext } from "../contexts/NotificationContext";
import { INotification, INotificationForm } from "../interfaces/INotificationContext";
// import background from './../assets/maxim-hopman-fiXLQXAhCfk-unsplash.jpg'

interface IProps {
  notif: INotification
}

const DeleteNotifModal: React.FC<IProps> = ({ notif }) => {
  const { deleteNotification } = useContext(NotificationContext)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = () => {
    deleteNotification(notif.id);
    handleClose();
  }

  return (
    <>
      <Button onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this notif ?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteNotifModal;
