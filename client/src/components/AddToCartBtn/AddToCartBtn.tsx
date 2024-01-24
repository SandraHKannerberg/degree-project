import { Button } from "react-bootstrap";
import { useCartContext } from "../../context/CartContext";
import { Product } from "../../context/ProductContext";

type ProductProps = {
  product: Product;
};

// Component with button to add an item/product to the shoppingcart
function AddToCartBtn({ product }: ProductProps) {
  const { addToCart } = useCartContext();

  return (
    <Button
      className="shadow"
      style={{
        backgroundColor: "#85586f",
        border: "none",
        borderRadius: 0,
        color: "#EFE1D1",
        fontWeight: 500,
      }}
      onClick={() => addToCart(product._id, product.title, product.price)}
    >
      Add to cart
    </Button>
  );
}

export default AddToCartBtn;
