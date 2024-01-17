import { Button } from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";

// Component for Go To Checkout
const CheckoutButton = () => {
  const { cartItems } = useCartContext();

  async function handlePayment() {
    const cartToStripe = cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    console.log(cartToStripe);

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cartToStripe }),
    });

    if (!response.ok) {
      return;
    }

    //Save session id to localStorage
    const { url, sessionId } = await response.json();
    localStorage.setItem("session-id", sessionId);
    window.location = url;
  }
  return (
    <>
      <Button
        type="submit"
        onClick={handlePayment}
        size="lg"
        style={{
          backgroundColor: "#331D2C",
          border: "none",
          borderRadius: 0,
          color: "#EFE1D1",
          fontWeight: 500,
        }}
      >
        Go To Checkout
      </Button>
    </>
  );
};

export default CheckoutButton;
