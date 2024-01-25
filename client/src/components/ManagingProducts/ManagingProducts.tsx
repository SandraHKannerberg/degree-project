import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";
import { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Trash, Pen } from "react-bootstrap-icons";
import AddProductForm from "../AddProductForm/AddProductForm";

// Component for managing products
// You need to be logged in with admin auth to be able to access this productlist
// As an admin you can add anew product, edit existing product and delete existing product
function ManagingProducts() {
  const { loggedInUser } = useUserContext();

  const {
    products,
    getAllProducts,
    // updateProductInDatabase,
    deleteProductFromDatabase,
    // title,
    // setTitle,
    // image,
    // setImage,
    // brand,
    // setBrand,
    // description,
    // setDescription,
    // price,
    // setPrice,
    // inStock,
    // setInStock,
    // careAdvice,
    // setCareAdvice,
    // features,
    // setFeatures,
    // categories,
    // setCategories,
  } = useProductContext();

  // States for modal in the context of delete
  const [showConfirm, setShowConfirm] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  // Handle the first modal that requires confirm before delete
  const handleCloseConfirm = () => setShowConfirm(false);
  const handleShowConfirm = () => setShowConfirm(true);

  // Handle the second modal to show confirm after delete
  const handleCloseComplete = () => setShowComplete(false);
  const handleShowComplete = () => setShowComplete(true);

  useEffect(() => {
    getAllProducts();
  }, []);

  //Eventlistener on delete button
  const handleDelete = async (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    event.preventDefault();
    deleteProductFromDatabase(id);

    // Close the first modal and show the next one to confirm the delete
    handleCloseConfirm();
    handleShowComplete();
  };

  return (
    <>
      {loggedInUser?.isAdmin && (
        <Container fluid className="mx-1">
          <h1>Products</h1>
          <Link to={"/admin"} style={{ padding: 0 }}>
            Go back
          </Link>

          <Row>
            <AddProductForm></AddProductForm>
          </Row>

          <Row>
            {products.map((product, index) => (
              <Row key={index} className="mb-3">
                <Col>
                  {" "}
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{ maxWidth: "50px", maxHeight: "50px" }}
                  />
                </Col>
                <Col>{product.title}</Col>
                <Col>{product.brand}</Col>
                <Col>{product.description}</Col>
                <Col>{product.price} SEK</Col>
                <Col>{product.inStock}</Col>
                <Col>{product.careAdvice}</Col>
                <Col>{product.features}</Col>
                <Col>{product.categories}</Col>
                <Col>
                  <Button variant="dark">
                    <Pen></Pen>
                  </Button>
                  <Button variant="danger" onClick={handleShowConfirm}>
                    <Trash></Trash>
                  </Button>
                </Col>

                {/* Modal to require confirm before delete */}
                <Modal
                  show={showConfirm}
                  onHide={handleCloseConfirm}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm delete</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to delete this product? The action is
                    permanent and can't be undone.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirm}>
                      Close
                    </Button>
                    <Button
                      variant="danger"
                      onClick={(e) => handleDelete(e, product._id)}
                    >
                      Yes, delete
                    </Button>
                  </Modal.Footer>
                </Modal>

                {/* Modal to confirm that the delete was successfull */}
                <Modal
                  show={showComplete}
                  onHide={handleCloseComplete}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Deleted</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>The product are now deleted</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseComplete}>
                      OK
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Row>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}

export default ManagingProducts;
