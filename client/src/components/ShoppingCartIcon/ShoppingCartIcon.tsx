import { Badge, Col } from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";

function ShoppingCartIcon() {
  return (
    <Col lg={4} className="position-relative">
      <Cart
        style={{
          border: "none",
          borderRadius: 0,
          color: "#EFE1D1",
          fontSize: "2.5rem",
        }}
      ></Cart>
      <Badge
        bg="dark"
        className="position-absolute top-0 end-0"
        style={{ borderRadius: "50%" }}
      >
        9
      </Badge>
    </Col>
  );
}

export default ShoppingCartIcon;
