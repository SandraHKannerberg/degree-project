import logotype from "../../assets/logotype-lotus.png";
import { Link } from "react-router-dom";

//Logotype component.
function Logotype() {
  return (
    <>
      <Link to={"/"} style={{ padding: 0 }} className="menu-link">
        <img
          src={logotype}
          alt="Lotus Harmony logotype"
          width="80"
          height="60"
        />
      </Link>
    </>
  );
}

export default Logotype;
