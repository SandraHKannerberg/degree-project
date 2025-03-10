import { Button, Col, Row } from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";
import CheckoutBtn from "../CheckoutBtn/CheckoutBtn";
import { Trash, Plus, Dash } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import "./CartItems.css";

// Component to show content (cart items) in the shoppingcart
function CartItems() {
  const {
    cartItems,
    addToCart,
    decreaseCartQuantity,
    removeFromCart,
    calculateTotalPrice,
  } = useCartContext();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const price = calculateTotalPrice();
    if (typeof price === "number" && !isNaN(price)) {
      setTotalPrice(price);
    } else {
      console.error("Price is not a valid number:", price);
    }
  }, [calculateTotalPrice]);

  return (
    <>
      {/* Render cart items in shoppingcart with image, title, price, quantity and buttons to increase / decrease qty or remove item */}
      <ul className="p-0" role="list">
        {cartItems.map((cartItem, index) => {
          return (
            <li key={index}>
              <Row className="d-flex justify-content-between align-items-center my-2 p-0 mx-0">
                <Col className="m-0 p-0">
                  <img alt="" src={cartItem.image} className="mini-img" />
                </Col>
                <Col xs={5} className="font-size-xs">
                  {cartItem.name}
                </Col>
                <Col className="font-size-xs p-0">{cartItem.quantity}</Col>
                <Col className="p-2 font-size-xs">{cartItem.price} SEK</Col>
              </Row>

              <Row className="d-flex">
                <Col className="d-flex gap-2 justify-content-end">
                  {/* Increase quantity */}
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() =>
                      addToCart(
                        cartItem.id,
                        cartItem.name,
                        cartItem.price,
                        cartItem.image
                      )
                    }
                    className="fs-5"
                    aria-label="Increase quantity"
                  >
                    <Plus />
                  </Button>

                  {/* Decrease quantity */}
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() => decreaseCartQuantity(cartItem.id)}
                    className="fs-5"
                    aria-label="Decrease quantity"
                  >
                    <Dash />
                  </Button>

                  {/* Delete cart item */}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => removeFromCart(cartItem.id)}
                    className="fs-5"
                    aria-label="Delete product from cart"
                  >
                    <Trash />
                  </Button>
                </Col>
              </Row>
            </li>
          );
        })}
      </ul>

      {/* Totalprice for cart items. (Shippingcost adds in the checkout from Stripe. Dont't show totalprice if shoppingcart is empty */}
      {cartItems.length > 0 && (
        <Row className="mt-5 mb-3" style={{ borderTop: "2px solid #EFE1D1" }}>
          <p className="mt-2 d-flex justify-content-end fs-5 fw-semibold">
            TOTAL --- {totalPrice} SEK
          </p>
        </Row>
      )}

      {/* Dont't show Checkout-button if shoppingcart is empty */}
      {cartItems.length > 0 && (
        <Row>
          <CheckoutBtn />
        </Row>
      )}
    </>
  );
}

export default CartItems;
