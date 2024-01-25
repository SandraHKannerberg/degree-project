import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";

function LogOut() {
  const { logout } = useUserContext();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);

  const handleLogout = async () => {
    await logout();
  };

  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Button
        style={{
          backgroundColor: "#A78295",
          border: "none",
          borderRadius: 0,
          color: "#EFE1D1",
          fontWeight: 500,
        }}
        className="shadow zoom-effect"
        onClick={handleShowModal}
      >
        Log Out
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Please Confirm Log out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer style={{ border: 0 }}>
          <Button
            className="zoom-effect"
            variant="outlined-secondary"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            style={{
              color: "#EFE1D1",
              backgroundColor: "#85586F",
              border: "none",
              borderRadius: 0,
            }}
            onClick={handleLogout}
            className="shadow zoom-effect"
          >
            Log out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LogOut;
