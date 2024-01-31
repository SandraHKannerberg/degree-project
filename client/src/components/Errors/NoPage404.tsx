import { Col, Container, Row } from "react-bootstrap";
import error404 from "../../assets/404.png";
import LazyLoad from "react-lazy-load";
import Header from "../Header/Header";

//Show this component if you try to go to an URL that doesn't exists in this project
function NoPage404() {
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "50vh", marginTop: "10rem" }}
    >
      <Header></Header>
      <Row className="d-flex justify-content-center align-items-center">
        <Col className="d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-center">
            Sorry, we have a problem - can't find the page
          </h1>
          <Col className="d-flex justify-content-center">
            <LazyLoad height={300} width={300}>
              <img
                src={error404}
                alt="Error-page not found"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </LazyLoad>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}

export default NoPage404;
