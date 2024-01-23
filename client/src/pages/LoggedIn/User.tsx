import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import { useUserContext } from "../../context/UserContext";

function User() {
  const { loggedInUser } = useUserContext();
  return (
    <>
      <Header />
      <Menu />
      {loggedInUser ? (
        <h1>{loggedInUser.firstName}</h1>
      ) : (
        <p>You need to log in for this page</p>
      )}
      <Footer />
    </>
  );
}

export default User;
