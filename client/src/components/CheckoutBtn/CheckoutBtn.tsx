import { Button } from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";

// Component for Go To Checkout
const CheckoutButton = () => {
  const { handlePayment } = useCartContext();

  return (
    <>
      <Button
        type="submit"
        className="shadow dark border-0 rounded-0"
        onClick={handlePayment}
        size="lg"
        variant="dark"
      >
        Go To Checkout
      </Button>
    </>
  );
};

export default CheckoutButton;
