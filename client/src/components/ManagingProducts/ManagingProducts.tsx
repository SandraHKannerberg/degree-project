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
  Alert,
  Pagination,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Trash, Pen } from "react-bootstrap-icons";
import { useUserContext } from "../../context/UserContext";
import { useProductContext } from "../../context/ProductContext";
import NoAccess401 from "../Errors/NoAccess401";
import "./ManagningProducts.css";

// As admin you can managing existing products here
// Update or delete
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

  // States for the delete modal
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState("");

  //Sates if error occured with update
  const [errorUpdate, setErrorUpdate] = useState("");
  const [failed, setFailed] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15; //Products per page

  // Count index for first and last product on current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const URL = "https://degree-project.onrender.com";

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

  // Timeout for info alert after successfull update
  useEffect(() => {
    if (success === true) {
      setTimeout(() => {
        setSuccess(false);
      }, 5000); // 5sec
    }
  }, [success]);

  // Timeout for info alert error update
  useEffect(() => {
    if (failed === true) {
      setTimeout(() => {
        setFailed(false);
      }, 5000); // 5sec
    }
  }, [failed]);

  // Function to handle updateProduct, with fetch to backend and save info to database
  const updateProduct = (id: string) => {
    const url = `${URL}/api/products/` + id;

    const requestBody = {
      _id: id,
      // Includes the inputs with value
      ...(image && { image }),
      ...(title && { title }),
      ...(brand && { brand }),
      ...(description && { description }),
      ...(price && { price }),
      ...(inStock && { inStock }),
      // Add careAdvice and features only if they have a value since they are not required
      ...(careAdvice && { careAdvice }),
      ...(features.length > 0 && { features }),
      deleted: false,
    };

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response || response.status === 400) {
          setSuccess(false);
          setFailed(true);
          setErrorUpdate(
            "ERROR Occured - The product with " + id + " is not updated"
          );
          throw new Error(
            "ERROR - Something went wrong, the product with " +
              id +
              " is not updated"
          );
        }
        // If the requierd fields have values the update are approved
        if (image || brand || title || description || price || inStock) {
          setSuccess(true);
          setFailed(false);
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

    // If selected product set the values / states
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
    <Container
      fluid
      className="d-flex justify-content-center align-items-content"
      style={{ padding: 0 }}
    >
      {loggedInUser?.isAdmin && (
        <Container
          fluid
          className="d-flex flex-column"
          style={{
            width: "95vw",
            margin: 0,
            padding: 0,
          }}
        >
          <Link to={"/admin"} style={{ padding: 0 }} className="menu-link">
            <Col className="mt-3 mx-3">
              <h5>Go back</h5>
            </Col>
          </Link>

          <h3 className="text-center mb-4">Edit or delete products</h3>

          <Accordion className="shadow mb-4 d-flex flex-column justify-content-center align-items-center">
            {currentProducts.map((product) => (
              <Accordion.Item
                key={product._id}
                eventKey={product._id}
                style={{ backgroundColor: "#f8ede3", width: "100%" }}
              >
                <Accordion.Header
                  onClick={(e) => handleOpenEdit(e, product._id)}
                  className="d-flex flex-wrap flex-column p-3 customize-accordion-btn"
                  style={{ backgroundColor: "#f8ede3" }}
                >
                  <Col
                    className="d-flex align-items-center gap-3"
                    style={{ backgroundColor: "#f8ede3" }}
                  >
                    <img
                      className="shadow product-xs-img"
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

                    {/* Tool buttons */}
                    <div className="d-flex justify-content-end gap-3 mx-3">
                      <span
                        style={{
                          fontSize: "25px",
                          filter: "drop-shadow(0 0 0.75rem #3F2E3E)",
                        }}
                        onClick={(e) => handleOpenEdit(e, product._id)}
                      >
                        <Pen />
                      </span>

                      <span
                        style={{
                          fontSize: "25px",
                          color: "#dc3545",
                          filter: "drop-shadow(0 0 0.75rem crimson)",
                        }}
                        onClick={() => handleShowConfirmDelete(product._id)}
                      >
                        <Trash />
                      </span>
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
                        <td style={{ backgroundColor: "#f8ede3" }}>
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
                        <td style={{ backgroundColor: "#f8ede3" }}>
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
                        <td style={{ backgroundColor: "#f8ede3" }}>
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
                        <td style={{ backgroundColor: "#f8ede3" }}>
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
                        <td style={{ backgroundColor: "#f8ede3" }}>
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
                        <td style={{ backgroundColor: "#f8ede3" }}>
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
                        <td style={{ backgroundColor: "#f8ede3" }}>
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
                        <td style={{ backgroundColor: "#f8ede3" }}>
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
                        <td
                          style={{ backgroundColor: "#f8ede3" }}
                          className="d-flex justify-content-end"
                        >
                          <Button
                            className="zoom-effect"
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
                        <td
                          style={{ backgroundColor: "#f8ede3" }}
                          className="d-flex justify-content-center align-items-center"
                        >
                          {/* Info alert to confirm when update is done */}
                          <Alert
                            variant="success"
                            show={success}
                            className="d-flex justify-content-center align-items-center w-50"
                          >
                            <p className="m-0">
                              Saved! The product was successfully updated.
                            </p>
                          </Alert>
                        </td>
                        <td
                          style={{ backgroundColor: "#f8ede3" }}
                          className="d-flex justify-content-center align-items-center"
                        >
                          {/* Info alert to confirm when update is done */}
                          <Alert
                            variant="danger"
                            show={failed}
                            className="d-flex justify-content-center align-items-center w-50"
                          >
                            <p className="m-0">{errorUpdate}</p>
                          </Alert>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>

          {/* Pagination */}
          <Pagination className="justify-content-center">
            {Array.from(
              { length: Math.ceil(products.length / productsPerPage) },
              (_, index) => (
                <Pagination.Item
                  key={index}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                  className="customize-pagination"
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>

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
      {!loggedInUser?.isAdmin ? <NoAccess401></NoAccess401> : null}
    </Container>
  );
}

export default ManagingProducts;
