import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useCartContext } from "../context/CartContext";
import Failed from "../components/ConfirmationDetails/Failed";
import Success from "../components/ConfirmationDetails/Success";

function Confirmation() {
  const { verifyPayment, isPaymentVerified } = useCartContext();

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <>
      <Header />
      <Menu />
      <Container fluid className="my-5" style={{ minHeight: "35vh" }}>
        {isPaymentVerified ? <Success /> : <Failed />}
      </Container>
      <Footer />
    </>
  );
}

export default Confirmation;
