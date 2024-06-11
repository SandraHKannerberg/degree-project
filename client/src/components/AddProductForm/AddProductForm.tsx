import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { NewProduct, useProductContext } from "../../context/ProductContext";
import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoAccess401 from "../Errors/NoAccess401";

// Component to add new product. Require admin login
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
    categories,
    getAllCategories,
  } = useProductContext();

  const { loggedInUser } = useUserContext();

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    resetForm();
    getAllCategories();
  }, []);

  // Reset the inputs
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

  //States for success or error
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const handleCloseSuccess = () => setSuccess(false);
  const handleCloseError = () => setError(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSaveNewProduct = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    //New product data required inputs
    const newProductData: NewProduct = {
      title,
      brand,
      description,
      price,
      inStock,
      image,
      categories: [selectedCategory],
    };

    // CareAdvice not required - Add if value entered
    if (careAdvice) {
      newProductData.careAdvice = careAdvice;
    }

    // Features not required - Add if value entered
    if (features && features.length > 0) {
      newProductData.features = features;
    }

    try {
      // Fetch createProduct from backend
      const productResponse = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductData),
      });

      if (productResponse.ok) {
        await productResponse.json();

        setSuccess(true);
        resetForm();
      } else {
        throw new Error("Failed to create product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setError(true);
    }
  };

  // Select categories in a select input
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
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
            <Form onSubmit={handleSaveNewProduct}>
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
                    required
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
                  onChange={(e) => setCareAdvice(e.target.value ?? "")}
                />
              </Form.Group>
              <Form.Group controlId="formFeatures" className="mb-3">
                <Form.Label>Features (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter features"
                  name="features"
                  value={features.join(", ")}
                  onChange={(e) => {
                    const value = e.target.value.trim();
                    setFeatures(
                      value ? value.split(",").map((item) => item.trim()) : []
                    );
                  }}
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
              <Form.Group controlId="formCategories" className="mb-3">
                <Form.Label>Select category</Form.Label>
                <select
                  className="form-select"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="">Select...</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.title}
                    </option>
                  ))}
                </select>
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

          {/* Confirmation modal */}
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

          {/* Modal if error occured */}
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
        // 401 page if not logged in with admin auth
        <NoAccess401></NoAccess401>
      )}
    </>
  );
}

export default AddProductForm;
