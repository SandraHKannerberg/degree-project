import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../context/ProductContext";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const apiUrl = `/api/products/${id}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductDetails();
  }, [id]);

  return product ? <div>{product.title}</div> : null;
}

export default ProductDetails;
