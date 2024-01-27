import { useState, useEffect } from "react";
import {
  Container,
  Col,
  Table,
  Accordion,
  Button,
  Form,
  Modal,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Trash, Pen } from "react-bootstrap-icons";
import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";
import NoAdminAccess from "../Errors/NoAdminAccess";

function ManagingProducts() {
  const { loggedInUser } = useUserContext();

  const {
    products,
    getAllProducts,
    updateProductInDatabase,
    deleteProductFromDatabase,
    title,
    setTitle,
    image,
    setImage,
    brand,
    setBrand,
    description,
    setDescription,
    price,
    setPrice,
    inStock,
    setInStock,
    careAdvice,
    setCareAdvice,
    features,
    setFeatures,
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
    features: [] as string[],
  });

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");
  const [showConfirmEdit, setShowConfirmEdit] = useState(false);
  const [editProductId, setEditProductId] = useState("");

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

  const handleCloseConfirmEdit = () => {
    setShowConfirmEdit(false);
    setEditProductId("");
  };

  const handleShowConfirmEdit = (id: string) => {
    setShowConfirmEdit(true);
    setEditProductId(id);
  };

  const handleEdit = async (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    event.preventDefault();

    // Search after product by id in productlist to catch the id of the product that you want to update
    const selectedProduct = products.find((product) => product._id === id);

    console.log(selectedProduct);

    if (selectedProduct) {
      setImage(selectedProduct.image ?? "");
      setTitle(selectedProduct.title ?? "");
      setBrand(selectedProduct.brand ?? "");
      setDescription(selectedProduct.description ?? "");
      setPrice(selectedProduct.price ?? 0);
      setInStock(selectedProduct.inStock ?? 0);
      setCareAdvice(selectedProduct.careAdvice ?? "");
      setFeatures(selectedProduct.features ?? []);
      // I have chosen not to update categories here.
    }

    await updateProductInDatabase(id);
    console.log(id);
  };

  // Call the function to update product in database
  // await updateProductInDatabase(id);

  // CONFIRM HERE

  //Eventlistener on delete button
  const handleDelete = async (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    event.preventDefault();

    if (id) {
      await deleteProductFromDatabase(id);
      handleCloseConfirmDelete();
    }

    // Close the confirm modal after delete
    handleCloseConfirmDelete();
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

          <h3 className="text-center mb-4">Edit or delete products</h3>

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
                <Accordion.Body className="d-flex flex-column">
                  <Table
                    striped
                    bordered
                    hover
                    className="d-flex flex-row flex-sm-column"
                  >
                    <tbody className="d-flex flex-column w-100">
                      <tr className="d-flex flex-column w-100">
                        <td>
                          <p>Image URL</p>
                          <InputGroup className="mb-3">
                            <Form.Control
                              type="text"
                              name="image-url"
                              placeholder={"Image URL..." || product.image}
                              defaultValue={product.image}
                              onChange={(e) => setImage(e.target.value)}
                            />
                          </InputGroup>
                        </td>
                        <td>
                          <p>Titel</p>
                          <InputGroup className="mb-3">
                            <Form.Control
                              type="text"
                              name="title"
                              placeholder={"Title..." || product.title}
                              defaultValue={product.title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </InputGroup>
                        </td>
                        <td>
                          <p>Brand</p>
                          <InputGroup className="mb-3">
                            <Form.Control
                              type="text"
                              name="brand"
                              placeholder={"Brand..." || product.brand}
                              defaultValue={product.brand}
                              onChange={(e) => setBrand(e.target.value)}
                            />
                          </InputGroup>
                        </td>
                        <td>
                          <p>Description</p>
                          <InputGroup className="mb-3">
                            <Form.Control
                              type="text"
                              name="description"
                              placeholder={
                                "Description..." || product.description
                              }
                              defaultValue={product.description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </InputGroup>
                        </td>
                        <td>
                          <p>Price</p>
                          <InputGroup className="mb-3">
                            <Form.Control
                              type="number"
                              name="price"
                              placeholder={"Price..." || product.price}
                              defaultValue={product.price}
                              onChange={(e) => setPrice(Number(e.target.value))}
                            />
                          </InputGroup>
                        </td>
                        <td>
                          <p>InStock</p>
                          <InputGroup className="mb-3">
                            <Form.Control
                              type="number"
                              name="inStock"
                              placeholder={"InStock..." || product.inStock}
                              defaultValue={product.inStock}
                              onChange={(e) =>
                                setInStock(Number(e.target.value))
                              }
                            />
                          </InputGroup>
                        </td>
                        <td>
                          <p>Care advice</p>
                          <InputGroup className="mb-3">
                            <Form.Control
                              type="text"
                              name="careadvide"
                              defaultValue={product.careAdvice}
                              onChange={(e) => setCareAdvice(e.target.value)}
                            />
                          </InputGroup>
                        </td>
                        <td>
                          <p>Features</p>
                          <InputGroup className="mb-3">
                            <Form.Control
                              type="text"
                              name="features"
                              placeholder={"Features..." || product.features}
                              defaultValue={product.features}
                              onChange={(e) =>
                                setFeatures(
                                  e.target.value
                                    .split(",")
                                    .map((item) => item.trim())
                                )
                              }
                            />
                          </InputGroup>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Col className="d-flex justify-content-end gap-2">
                    <Button
                      variant="dark"
                      onClick={() => handleShowConfirmEdit(product._id)}
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

          {/* Conform edit modal */}
          <Modal show={showConfirmEdit} onHide={handleCloseConfirmEdit}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to update this product?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseConfirmEdit}>
                No
              </Button>
              <Button
                variant="danger"
                onClick={(e) => handleEdit(e, editProductId)}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
      {!loggedInUser?.isAdmin ? <NoAdminAccess></NoAdminAccess> : null}
    </Container>
  );
}

export default ManagingProducts;
