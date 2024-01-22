import {
  createContext,
  useState,
  useEffect,
  useContext,
  PropsWithChildren,
} from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}

export type newUserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type UserType = {
  email: string;
  password: string;
  isAdmin?: boolean;
};

interface IUserContext {
  loggedInUser?: User | null;
  isLoggedIn: boolean;
  authorization: () => void;
  handleRegistrationNewUser: (newUser: newUserType) => Promise<void>;
  handleLogin: (user: UserType) => Promise<void>;
  handleLogout: () => {};
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isAdmin: (user: UserType) => void;
  successInfo: string;
  setSuccessInfo: React.Dispatch<React.SetStateAction<string>>;
  errorInfo: string;
  setErrorInfo: React.Dispatch<React.SetStateAction<string>>;
  errorLogin: string;
  setErrorLogin: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValues = {
  loggedInUser: null,
  isLoggedIn: false,
  authorization: () => {},
  handleRegistrationNewUser: async () => {},
  handleLogin: async () => {},
  handleLogout: async () => {},
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  isAdmin: () => {},
  successInfo: "",
  setSuccessInfo: () => {},
  errorInfo: "",
  setErrorInfo: () => {},
  errorLogin: "",
  setErrorLogin: () => {},
};

export const UserContext = createContext<IUserContext>(defaultValues);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successInfo, setSuccessInfo] = useState("");
  const [errorInfo, setErrorInfo] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  // Function to check if someone is logged in
  const authorization = async () => {
    try {
      const response = await fetch("/api/users/authorize");
      const authData = await response.json();
      if (response.status === 200 || response.status === 304) {
        setLoggedInUser(authData);
      }
    } catch (err) {
      console.log("ERROR-MESSAGE:", err);
    }
  };

  useEffect(() => {
    authorization();
  }, []);

  // Function to check if logged in user = admin
  const isAdmin = (user: UserType) => {
    if (user.isAdmin == false) {
    }
  };

  // Function to register a new user
  const handleRegistrationNewUser = async (newUser: newUserType) => {
    if (newUser) {
      try {
        const response = await fetch("api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        await response.json();

        if (response.status === 200) {
          setSuccessInfo(
            "Namaste! You are now a registered customer. You are welcome to log in."
          );
        }

        if (response.status === 409) {
          setErrorInfo("*This email is already registered.");
        }
      } catch (err) {
        console.log("ERROR-MESSAGE:", err);
      }
    }
  };

  // Function to handle login. A user use their email and password for login.
  const handleLogin = async (user: UserType) => {
    if (user) {
      try {
        const response = await fetch("api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const userData = await response.json();

        if (response.status === 200) {
          setLoggedInUser(userData);
        }

        if (response.status === 404 || response.status === 401) {
          setErrorLogin("Ooops! Wrong email or password. Please try again");
        }
      } catch (err) {
        console.log("ERROR-MESSAGE:", err);
      }
    }
  };

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch("api/customers/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        setIsLoggedIn(false);
        setLoggedInUser(null);
        // setFirstname("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        authorization,
        isLoggedIn,
        handleRegistrationNewUser,
        handleLogin,
        handleLogout,
        email,
        setEmail,
        password,
        setPassword,
        isAdmin,
        successInfo,
        setSuccessInfo,
        errorInfo,
        setErrorInfo,
        errorLogin,
        setErrorLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
