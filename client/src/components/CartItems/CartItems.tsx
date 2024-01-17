import { Col, Row } from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";
import { useProductContext } from "../../context/ProductContext";
import CheckoutBtn from "../CheckoutBtn/CheckoutBtn";
import { Trash, PlusCircle, DashCircle } from "react-bootstrap-icons";

// Component to show content (cart items) in the shoppingcart
function CartItems() {
  const { cartItems, addToCart, decreaseCartQuantity, removeFromCart } =
    useCartContext();
  const { products } = useProductContext();

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
