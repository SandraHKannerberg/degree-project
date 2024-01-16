import { Badge } from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";
import { useCartContext } from "../../context/CartContext";

function ShoppingCartIcon() {
  const { cartTotalQuantity } = useCartContext();

  return (
    <div className="position-relative">
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
        className="position-absolute top-0 end-0 d-flex justify-content-center align-items-center"
        style={{
          borderRadius: "50%",
          height: "25px",
          width: "25px",
        }}
      >
        {cartTotalQuantity}
      </Badge>
    </div>
  );
}

export default ShoppingCartIcon;
