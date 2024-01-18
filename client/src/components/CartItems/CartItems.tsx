import { Col, Row } from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";
import { useProductContext } from "../../context/ProductContext";
import CheckoutBtn from "../CheckoutBtn/CheckoutBtn";
import { Trash, PlusCircle, DashCircle } from "react-bootstrap-icons";
import { useEffect, useState } from "react";

// Component to show content (cart items) in the shoppingcart
function CartItems() {
  const {
    cartItems,
    addToCart,
    decreaseCartQuantity,
    removeFromCart,
    calculateTotalPrice,
  } = useCartContext();
  const { products } = useProductContext();
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
      <ul style={{ padding: 0 }}>
        {cartItems.map((cartItem, index) => {
          const item = products.find((product) => product._id === cartItem.id);
          if (item === null) return null;

          return (
            <Row
              fluid
              key={index}
              className="d-flex justify-content-between align-items-center"
              style={{
                padding: 0,
                margin: 0,
              }}
            >
              <Col style={{ padding: 0, margin: 0 }}>
                <img
                  src={item?.image}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                  }}
                />
              </Col>
              <Col xs={5} style={{ fontSize: "14px" }}>
                {cartItem.name}
              </Col>
              <Col style={{ fontSize: "14px", padding: 0 }}>
                {cartItem.quantity}
              </Col>
              <Col className="p-2" style={{ fontSize: "14px", padding: 0 }}>
                {cartItem.price} kr
              </Col>
              <Col
                className="d-flex gap-1"
                style={{ fontSize: "20px", padding: 0 }}
              >
                {/* Increase quantity */}
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    addToCart(cartItem.id, cartItem.name, cartItem.price)
                  }
                >
                  <PlusCircle />
                </div>

                {/* Decrease quantity */}
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => decreaseCartQuantity(cartItem.id)}
                >
                  <DashCircle />
                </div>

                {/* Delete cart item */}
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => removeFromCart(cartItem.id)}
                >
                  <Trash />
                </div>
              </Col>
            </Row>
          );
        })}
      </ul>

      {/* Totalprice for cart items. (Shippingcost adds in the checkout from Stripe. Dont't show totalprice if shoppingcart is empty */}
      <Row className="mt-5 mb-3" style={{ borderTop: "2px solid #EFE1D1" }}>
        <h5 className="mt-2 d-flex justify-content-end">
          TOTALPRICE --- {totalPrice} kr
        </h5>
      </Row>

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