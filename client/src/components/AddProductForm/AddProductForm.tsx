import { Button, Form, Row } from "react-bootstrap";
import { NewProduct, useProductContext } from "../../context/ProductContext";

function AddProductForm() {
  const {
    products,
    getAllProducts,
    updateProductInDatabase,
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
    setCategories,
  } = useProductContext();

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
        const newProductToDatabase = await productResponse.json();
        console.log(
          "New product successfully added to the database:",
          newProductToDatabase
        );
        // SUCCESS Message here
      }

      if (productResponse.status === 400)
        //ERROR Message here
        console.log("Error");
    } catch (error) {
      console.error("Error adding new product to the database:", error);
    }
  };

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
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group controlId="formTitle">
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
        <Form.Group controlId="formBrand">
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
            setFeatures(e.target.value.split(",").map((item) => item.trim()))
          }
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group controlId="formPrice">
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
        <Form.Group controlId="formInStock">
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
      </Row>

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

      <Button variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
}

export default AddProductForm;
