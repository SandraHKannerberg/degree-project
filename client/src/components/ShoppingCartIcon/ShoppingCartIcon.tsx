import { Badge } from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";
import { useCartContext } from "../../context/CartContext";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

function ShoppingCartIcon() {
  const { cartTotalQuantity } = useCartContext();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="position-relative">
      <Cart
        style={{
          border: "none",
          borderRadius: 0,
          color: "#EFE1D1",
          fontSize: "2.5rem",
        }}
        onClick={handleShow}
      ></Cart>
      <Badge
        bg="dark"
        className="position-absolute top-0 end-0 d-flex justify-content-center align-items-center"
        style={{
          borderRadius: "50%",
          height: "25px",
          width: "25px",
        }}
        onClick={handleShow}
      >
        {cartTotalQuantity}
      </Badge>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ShoppingCart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartTotalQuantity !== 0 && (
            <p>You have {cartTotalQuantity} items in your shoppingcart</p>
          )}
          {cartTotalQuantity === 0 && <p>Your shoppingcart is empty</p>}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default ShoppingCartIcon;
