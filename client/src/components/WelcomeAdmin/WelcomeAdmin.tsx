import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { BoxSeam, PatchPlus, PencilSquare } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

// Component with Welcome content when you log in as an admin
function WelcomeAdmin() {
  return (
    <>
      <Container
        fluid
        style={{
          paddingTop: "5rem",
        }}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <h1 className="text-center">Admin Dashboard</h1>
        <Row className="w-100 mt-5 d-flex flex-col flex-md-row gap-3 bg-primary">
          <Col className="d-flex flex-column justify-content-center align-items-center text-center">
            <Link
              to={"/admin/orders"}
              className="zoom-effect text-decoration-none"
            >
              <Card className="p-3 border-0 shadow">
                <CardTitle className="fs-4">Managing Orders</CardTitle>
                <CardBody>
                  <BoxSeam className="fs-2"></BoxSeam>
                </CardBody>
              </Card>
            </Link>
          </Col>

          <Col className="d-flex flex-column justify-content-center align-items-center text-center">
            <Link
              to={"/admin/products"}
              className="zoom-effect text-decoration-none"
            >
              <Card className="p-3 border-0 shadow">
                <CardTitle className="fs-4">Managing Products</CardTitle>
                <CardBody>
                  <PencilSquare className="fs-2"></PencilSquare>
                </CardBody>
              </Card>
            </Link>
          </Col>

          <Col className="d-flex flex-column justify-content-center align-items-center text-center">
            <Link
              to={"/admin/addproduct"}
              className="zoom-effect text-decoration-none"
            >
              <Card className="p-3 border-0 shadow">
                <CardTitle className="fs-4">Add New Product</CardTitle>
                <CardBody>
                  <PatchPlus className="fs-2"></PatchPlus>
                </CardBody>
              </Card>
            </Link>
          </Col>
        </Row>
        {/* <div
          className="py-4 px-3"
          style={{ backgroundColor: "rgba(25, 0, 0, 0.5)", color: "#f8ede3" }}
        > */}
      </Container>
    </>
  );
}

export default WelcomeAdmin;
