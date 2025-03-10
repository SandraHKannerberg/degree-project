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
      className="shadow zoom-effect bg-dark border-0 rounded-0"
      onClick={() =>
        addToCart(product._id, product.title, product.price, product.image)
      }
    >
      Add to cart
    </Button>
  );
}

export default AddToCartBtn;
