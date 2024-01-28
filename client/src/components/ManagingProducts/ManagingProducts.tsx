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
    success,
    setSuccess,
    getAllProducts,
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

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");

  useEffect(() => {
    getAllProducts();
  }, []);

  // Handle close of the confirm delete modal
  const handleCloseConfirmDelete = () => {
    setShowConfirmDelete(false);
    setDeleteProductId("");
  };

  // Handle show of the confirm modal before delete
  const handleShowConfirmDelete = (id: string) => {
    setShowConfirmDelete(true);
    setDeleteProductId(id);
  };

  // Handle close of the edit-modal
  const handleClose = () => {
    setSuccess(false);
  };

  // Function to handle updateProduct, with fetch to backend and save info to database
  const updateProduct = (id: string) => {
    const url = "/api/products/" + id;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        image: image,
        title: title,
        brand: brand,
        description: description,
        price: price,
        inStock: inStock,
        careAdvice: careAdvice,
        features: features,
        deleted: false,
      }),
    })
      .then((response) => {
        if (!response || response.status === 400) {
          setSuccess(false);
          throw new Error(
            "ERROR - Something went wrong, the product with " +
              id +
              " is not updated"
          );
        }
        if (
          image ||
          brand ||
          title ||
          description ||
          price ||
          inStock ||
          careAdvice ||
          features
        ) {
          setSuccess(true);
          getAllProducts();
        }
      })

      .catch((e) => {
        console.log(e);
      });
  };

  // Handle click on edit (pen). Open the edit-form. The current product data is pre-entered and the fields are editable.
  const handleOpenEdit = (event: React.MouseEvent<HTMLElement>, id: string) => {
    event.preventDefault();
    const selectedProduct = products.find((product) => product._id === id);

    if (selectedProduct) {
      setImage(selectedProduct.image);
      setTitle(selectedProduct.title);
      setBrand(selectedProduct.brand);
      setDescription(selectedProduct.description);
      setPrice(selectedProduct.price);
      setInStock(selectedProduct.inStock);
      setCareAdvice(selectedProduct?.careAdvice ?? "");
      setFeatures(selectedProduct?.features ?? []);
    }
  };

  // Save the updates
  const handleSaveUpdate = async (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    event.preventDefault();

    await updateProduct(id);
  };

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

          <Accordion className="shadow mb-4">
            {products.map((product) => (
              <Accordion.Item key={product._id} eventKey={product._id}>
                <Accordion.Header
                  onClick={(e) => handleOpenEdit(e, product._id)}
                >
                  <Col className="d-flex align-items-center gap-3">
                    <img
                      className="shadow"
                      src={product.image}
                      alt={product.title}
                      style={{
                        maxWidth: "70px",
                        maxHeight: "70px",
                        border: "1px solid #D0B8AB",
                      }}
                    />
                    <Col className="d-flex flex-column">
                      <span>{product.title}</span>
                      <span style={{ fontSize: "14px" }}>
                        Id: {product._id}
                      </span>
                    </Col>
                    <div className="d-flex justify-content-end gap-3 mx-3">
                      <Col
                        className="d-flex align-items-center justify-content-center p-3 shadow zoom-effect"
                        style={{
                          height: "50px",
                          width: "50px",
                          backgroundColor: "#331D2C",
                          color: "#FFF",
                          borderRadius: "50%",
                        }}
                        onClick={(e) => handleOpenEdit(e, product._id)}
                      >
                        <Pen />
                      </Col>

                      <Col
                        className="d-flex align-items-center justify-content-center p-3 shadow zoom-effect"
                        style={{
                          height: "50px",
                          width: "50px",
                          backgroundColor: "#dc3545",
                          color: "#FFF",
                          borderRadius: "50%",
                        }}
                        onClick={() => handleShowConfirmDelete(product._id)}
                      >
                        <Trash />
                      </Col>
                    </div>
                  </Col>
                </Accordion.Header>
                <Accordion.Body className="d-flex flex-column">
                  <Table
                    striped
                    bordered
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
                                setFeatures(e.target.value.split(","))
                              }
                            />
                          </InputGroup>
                        </td>
                        <td className="d-flex justify-content-end">
                          <Button
                            className="shadow zoom-effect"
                            style={{
                              backgroundColor: "#3F2E3E",
                              color: "#EFE1D1",
                              borderRadius: 0,
                              border: "none",
                            }}
                            onClick={(e) => handleSaveUpdate(e, product._id)}
                          >
                            Save
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
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

          {/* Info modal to confirm when update is done */}
          <Modal show={success} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Update Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>Update done for product</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                OK
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
