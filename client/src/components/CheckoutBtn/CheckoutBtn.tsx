import { Button } from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";

// Component for Go To Checkout
const CheckoutButton = () => {
  const { handlePayment } = useCartContext();

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
