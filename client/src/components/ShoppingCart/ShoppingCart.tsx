import { Badge, Button } from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";
import { useCartContext } from "../../context/CartContext";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import CartItems from "../CartItems/CartItems";

// Component for the shoppingcart-icon with badge to show quantity of cart-items.
// Click on the icon to show the shoppingcart
function ShoppingCart() {
  const { cartTotalQuantity } = useCartContext();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="position-relative">
      {/* Shoppingcarticon */}
      <Button
        onClick={handleShow}
        style={{ background: "none" }}
        className="zoom-effect border-0 hover:bg-danger"
        aria-label="shopping-cart"
      >
        <Cart
          className="fs-3"
          // style={{
          //   color: "#EFE1D1",
          // }}
        ></Cart>
        {/* Badge to show totalt items in cart */}
        <Badge
          bg="dark"
          className="position-absolute top-0 end-0 d-flex justify-content-center align-items-center shadow"
          style={{
            borderRadius: "50%",
            height: "25px",
            width: "25px",
          }}
          onClick={handleShow}
        >
          {cartTotalQuantity}
        </Badge>
      </Button>

      {/* Shoppingcart. Show when click the icon */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="w-90 w-md-100 text-dark bg-light-clr"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>ShoppingCart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>
            {cartTotalQuantity === 0 ? (
              "Your shopping cart is empty"
            ) : (
              <>
                You have{" "}
                <span style={{ fontWeight: "bold" }}>
                  {cartTotalQuantity}{" "}
                  {cartTotalQuantity === 1 ? "item" : "items"}
                </span>{" "}
                in your shopping cart
              </>
            )}
          </p>
          <CartItems></CartItems>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default ShoppingCart;
