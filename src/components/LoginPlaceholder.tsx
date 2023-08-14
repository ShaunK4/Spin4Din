import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function LoginPlaceholder() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="outline-light" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
          <img
            src="../logo.ico"
            alt="Logo"
            style={{ marginRight: "10px", width: "55px", height: "55px" }}
          />
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
            <FloatingLabel
              label="Username"
            >
              <Form.Control
                type="username"
                placeholder="Username"
                autoFocus
              />
            </FloatingLabel>
            </Form.Group>
            <Form.Group>
              <Form.Label>{" "}</Form.Label>
              <FloatingLabel
              label="Password"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                 />
               </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoginPlaceholder;