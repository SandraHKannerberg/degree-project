import { useState, useEffect } from "react";
import {
  Container,
  Col,
  Table,
  Accordion,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Trash, Pen } from "react-bootstrap-icons";
import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";

function ManagingProducts() {
  const { loggedInUser } = useUserContext();
  const {
    products,
    getAllProducts,
    updateProductInDatabase,
    deleteProductFromDatabase,
  } = useProductContext();

  const [editProduct, setEditProduct] = useState({
    _id: "",
    title: "",
    brand: "",
    description: "",
    price: 0,
    image: "",
    inStock: 0,
    careAdvice: "",
    features: [],
  });

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");
  // const [showConfirmEdit, setShowConfirmEdit] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  // Handle close of the confirm modal
  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
    setDeleteProductId("");
  };

  // Handle show of the confirm modal before delete
  const handleShowConfirmDelete = (id: string) => {
    setShowConfirmDelete(true);
    setDeleteProductId(id);
  };

  // const handleCloseConfirmEdit = () => setShowConfirmEdit(false);
  // const handleShowConfirmEdit = () => setShowConfirmEdit(true);

  // const handleEdit = async (
  //   event: React.MouseEvent<HTMLElement>,
  //   id: string
  // ) => {
  //   // Implementera logiken för att hantera redigeringen av produkten med det angivna ID:et
  //   console.log("Edit product with ID:", id, "New values:", editProduct);
  // };

  //Eventlistener on delete button
  const handleDelete = async (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    event.preventDefault();

    if (id) {
      deleteProductFromDatabase(id);
      handleCloseConfirmDelete();
    }

    deleteProductFromDatabase(id);

    // Close the confirm modal after delete
    handleCloseConfirmDelete();
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <Container className="d-flex justify-content-center">
      {loggedInUser?.isAdmin && (
        <Container fluid className="mx-1">
          <Link to={"/admin"} style={{ padding: 0 }} className="menu-link">
            <Col className="mt-3 mx-3">
              <h5>Go back</h5>
            </Col>
          </Link>

          <Accordion>
            {products.map((product) => (
              <Accordion.Item key={product._id} eventKey={product._id}>
                <Accordion.Header>
                  <Col className="d-flex align-items-center gap-2">
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ maxWidth: "70px", maxHeight: "70px" }}
                    />
                    <Col className="d-flex flex-column">
                      <span>{product.title}</span>
                      <span style={{ fontSize: "14px" }}>
                        Id: {product._id}
                      </span>
                    </Col>
                  </Col>
                </Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>
                          <Form.Control
                            type="text"
                            name="image-url"
                            placeholder={"Image URL..." || product.image}
                            value={editProduct.image || product.image}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            name="title"
                            placeholder={"Title..." || product.title}
                            value={editProduct.title || product.title}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            name="brand"
                            placeholder={"Brand..." || product.brand}
                            value={editProduct.brand || product.brand}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            name="description"
                            placeholder={
                              "Description..." || product.description
                            }
                            value={
                              editProduct.description || product.description
                            }
                            onChange={handleInputChange}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            name="price"
                            placeholder={"Price..." || product.price}
                            value={editProduct.price || product.price}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            name="inStock"
                            placeholder={"InStock..." || product.inStock}
                            value={editProduct.inStock || product.inStock}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            name="careadvide"
                            value={editProduct.careAdvice || product.careAdvice}
                            onChange={handleInputChange}
                          />
                        </td>
                        <td>
                          {" "}
                          <Form.Control
                            type="text"
                            name="features"
                            placeholder={"Features..." || product.features}
                            value={editProduct.features || product.features}
                            onChange={handleInputChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Col className="d-flex justify-content-end gap-2">
                    <Button
                      variant="dark"
                      // onClick={(e) => handleEdit(e, product._id)}
                    >
                      <Pen />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleShowConfirmDelete(product._id)}
                    >
                      <Trash />
                    </Button>
                  </Col>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>

          {/* Conform delete modal */}
          <Modal show={showConfirmDelete} onHide={handleCloseConfirmDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete this product with id{" "}
              {deleteProductId}?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseConfirmDelete}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={(e) => handleDelete(e, deleteProductId)}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </Container>
  );
}

export default ManagingProducts;
