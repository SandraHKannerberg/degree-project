import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { NewProduct, useProductContext } from "../../context/ProductContext";
import { useUserContext } from "../../context/UserContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import NoAdminAccess from "../Errors/NoAdminAccess";

// Form to add new product
function AddProductForm() {
  const {
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

  const { loggedInUser } = useUserContext();

  // Reset fields after Save
  const resetForm = () => {
    setTitle("");
    setBrand("");
    setDescription("");
    setPrice(0);
    setImage("");
    setInStock(0);
    setCareAdvice("");
    setFeatures([]);
  };

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleCloseSuccess = () => setSuccess(false);
  const handleCloseError = () => setError(false);

  // Function to add new product
  const sendNewProductToDataBase = async (productData: NewProduct) => {
    const {
      title,
      brand,
      description,
      price,
      inStock,
      image,
      careAdvice,
      features,
      categories,
    } = productData;

    try {
      const productResponse = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          brand: brand,
          description: description,
          price: price,
          image: image,
          inStock: inStock,
          careAdvice: careAdvice,
          features: features,
          categories: categories,
        }),
      });

      if (productResponse.ok) {
        await productResponse.json();
        setSuccess(true);
        resetForm();
      }

      if (productResponse.status === 400) setError(true);
    } catch (error) {
      console.error("Error adding new product to the database:", error);
    }
  };

  // Handle button-click submit (Add product)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newProduct: NewProduct = {
      title,
      brand,
      description,
      price,
      inStock,
      image,
      careAdvice,
      features,
    };

    sendNewProductToDataBase(newProduct);
  };

  return (
    <>
      {loggedInUser?.isAdmin ? (
        <Container
          fluid
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <Row className="w-100">
            <Link to={"/admin"} style={{ padding: 0 }} className="menu-link">
              <Col className="mt-3 mx-3">
                <h5>Go back</h5>
              </Col>
            </Link>
          </Row>

          <Row className="p-3 mb-5 shadow">
            <Form onSubmit={handleSubmit}>
              <h3>Add a new product</h3>
              <Row>
                <Form.Group controlId="formTitle" className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBrand" className="mb-3">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter brand"
                    name="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Form.Group controlId="formDescription" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCareAdvice" className="mb-3">
                <Form.Label>Care Advice</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter care advice"
                  name="careAdvice"
                  value={careAdvice}
                  onChange={(e) => setCareAdvice(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formFeatures" className="mb-3">
                <Form.Label>Features (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter features"
                  name="features"
                  value={features.join(", ")}
                  onChange={(e) =>
                    setFeatures(
                      e.target.value.split(",").map((item) => item.trim())
                    )
                  }
                />
              </Form.Group>
              <Form.Group controlId="formPrice" className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value, 10))}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formInStock" className="mb-3">
                <Form.Label>In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter stock quantity"
                  name="inStock"
                  value={inStock}
                  onChange={(e) => setInStock(parseInt(e.target.value, 10))}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formImage" className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image URL"
                  name="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </Form.Group>

              <Col className="d-flex justify-content-end">
                <Button
                  className="mt-3 shadow zoom-effect"
                  type="submit"
                  style={{
                    backgroundColor: "#3F2E3E",
                    color: "#EFE1D1",
                    borderRadius: 0,
                    border: "none",
                  }}
                >
                  Add Product
                </Button>
              </Col>
            </Form>
          </Row>

          {/* Modal to confirm when a product is succesfully added to the database */}
          <Modal show={success} onHide={handleCloseSuccess} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>Complete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              New product was successfully added to the database.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" onClick={handleCloseSuccess}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal to show if error occurs when try add new product */}
          <Modal show={error} onHide={handleCloseError} backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Error occured. Can't add new product to the database
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseError}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      ) : (
        <NoAdminAccess></NoAdminAccess>
      )}
    </>
  );
}

export default AddProductForm;
