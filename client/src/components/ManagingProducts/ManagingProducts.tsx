import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Trash, Pen } from "react-bootstrap-icons";

// Component for managing products
// You need to be logged in with admin auth to be able to access this productlist
// As an admin you can add anew product, edit existing product and delete existing product
function ManagingProducts() {
  const { loggedInUser } = useUserContext();

  const { products, getAllProducts } = useProductContext();

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      {loggedInUser?.isAdmin && (
        <>
          {/* Wrapped container around productlist */}
          <Container fluid className="mx-1">
            <h1>Products</h1>
            <Link to={"/admin"} style={{ padding: 0 }}>
              Go back
            </Link>

            <table className="table table-striped align-middle shadow-sm rounded">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Brand</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>InStock</th>
                  <th>CareAdvice</th>
                  <th>Features</th>
                  <th>Category</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "14px" }}>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{ maxWidth: "50px", maxHeight: "50px" }}
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.brand}</td>
                    <td>{product.description}</td>
                    <td>{product.price} SEK</td>
                    <td>{product.inStock}</td>
                    <td>{product.careAdvice}</td>
                    <td>{product.features}</td>
                    <td>{product.categories}</td>
                    <td>
                      <Pen></Pen>
                    </td>
                    <td>
                      <Trash></Trash>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Container>
        </>
      )}
    </>
  );
}

export default ManagingProducts;
