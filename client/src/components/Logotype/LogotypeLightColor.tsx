import logotype from "../../assets/logotype-lightcolor.png";

function Logotype() {
  return (
    <figure>
      <img
        src={logotype}
        alt="Lotus Harmony logotype"
        style={{ maxHeight: "4rem" }}
      />
    </figure>
  );
}

export default Logotype;
