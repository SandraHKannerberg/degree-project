import logotype from "../../assets/logotype-lightcolor.png";
import { Link } from "react-router-dom";

function Logotype() {
  return (
    <>
      <Link to={"/"} style={{ padding: 0 }} className="menu-link">
        <img
          src={logotype}
          alt="Lotus Harmony logotype"
          style={{ maxHeight: "4rem" }}
        />
      </Link>
    </>
  );
}

export default Logotype;
