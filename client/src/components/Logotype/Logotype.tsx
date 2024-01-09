import logotype from "../../assets/logotype.png";
import { Container } from "react-bootstrap";

function Logotype() {
  return (
    <Container>
      <img
        src={logotype}
        alt="Lotus Harmony logotype"
        style={{ maxHeight: "4rem" }}
      />
    </Container>
  );
}

export default Logotype;
