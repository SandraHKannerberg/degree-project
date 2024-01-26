import { Container, Row } from "react-bootstrap";
import admingear from "../../assets/adminpanel.png";

// Component with Welcome content when you log in as an admin
function WelcomeAdmin() {
  return (
    <>
      <Container
        fluid
        style={{
          backgroundImage: `url(${admingear})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "80vh",
        }}
      >
        <Row className="p-3">
          <h1 className="text-center mt-4">Adminpanel</h1>
          <p className="text-center">
            Here it is able to managing orders. You can controll if an order are
            shipped or not, and mark is as shipped went it is shipped.
          </p>
          <p className="text-center">
            You can managing products by add a new one, edit an existing product
            or delete an existing product
          </p>
        </Row>
      </Container>
    </>
  );
}

export default WelcomeAdmin;
