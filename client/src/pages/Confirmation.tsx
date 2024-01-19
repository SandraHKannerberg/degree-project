import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useCartContext } from "../context/CartContext";

function Confirmation() {
  const { verifyPayment, isPaymentVerified } = useCartContext();

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <>
      <Header />
      <Menu />
      <Container>
        {isPaymentVerified ? (
          <div>
            <p>Thank you for your order</p>
          </div>
        ) : (
          <div>
            <p>
              Something went wrong with the payment. We can't handle your order.
            </p>
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Confirmation;
