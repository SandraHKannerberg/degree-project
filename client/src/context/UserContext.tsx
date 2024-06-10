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

export type NewUserType = {
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
  registrationNewUser: (newUser: NewUserType) => Promise<void>;
  login: (user: UserType) => Promise<void>;
  logout: () => {};
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isAdmin: (user: UserType) => boolean;
  successInfo: string;
  setSuccessInfo: React.Dispatch<React.SetStateAction<string>>;
  errorInfo: string;
  setErrorInfo: React.Dispatch<React.SetStateAction<string>>;
  errorLogin: string;
  setErrorLogin: React.Dispatch<React.SetStateAction<string>>;
  errorEmailInfo: string;
  setErrorEmailInfo: React.Dispatch<React.SetStateAction<string>>;
  errorPswInfo: string;
  setErrorPswInfo: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValues = {
  loggedInUser: null,
  isLoggedIn: false,
  authorization: () => {},
  registrationNewUser: async () => {},
  login: async () => {},
  logout: async () => {},
  firstName: "",
  setFirstName: () => {},
  lastName: "",
  setLastName: () => {},
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  isAdmin: () => false,
  successInfo: "",
  setSuccessInfo: () => {},
  errorInfo: "",
  setErrorInfo: () => {},
  errorLogin: "",
  setErrorLogin: () => {},
  errorEmailInfo: "",
  setErrorEmailInfo: () => {},
  errorPswInfo: "",
  setErrorPswInfo: () => {},
};

export const UserContext = createContext<IUserContext>(defaultValues);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successInfo, setSuccessInfo] = useState("");
  const [errorInfo, setErrorInfo] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [errorEmailInfo, setErrorEmailInfo] = useState("");
  const [errorPswInfo, setErrorPswInfo] = useState("");

  const BACKEND_URL="https://degree-project.onrender.com";

  // Function to check if someone is logged in
  const authorization = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/users/authorize`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
      });
      if (response.status === 200) {
        const authData = await response.json();
        setLoggedInUser(authData);
      } else if (response.status === 401) {
        // Clear authData when not logged in
        setLoggedInUser(null);
      }
    } catch (err) {
      console.log("ERROR-MESSAGE:", err);
    }
  };

  useEffect(() => {
    authorization();
  }, []); //Check if loggedIn status change

  // Function to check if logged in user is admin
  const isAdmin = (user: UserType): boolean => {
    // Assuming user object has a property isAdmin which is a boolean
    return user.isAdmin === true;
  };

  // Function to register a new user
  const registrationNewUser = async (newUser: NewUserType) => {
    if (newUser) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        await response.json();

        if (response.status === 201) {
          setSuccessInfo(
            "Namaste! You are now registered. You are welcome to log in."
          );
        }

        if (response.status === 409) {
          setErrorEmailInfo("*This email is already registered.");
          setEmail("");
        }

        if (response.status === 400) {
          setErrorPswInfo(
            "*Password require min 6 characters of which at least one letter and at least one number"
          );
        }

        if (response.status === 500) {
          setErrorInfo("An error occurred. Cannot complete registration");
        }
      } catch (err) {
        console.log("ERROR-MESSAGE:", err);
      }
    }
  };

  // Function to handle login. A user use their email and password for login.
  const login = async (user: UserType) => {
    if (user) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        const userData = await response.json();

        if (response.status === 200) {
          setLoggedInUser(userData);
          setIsLoggedIn(true);
        }

        if (response.status === 401) {
          setErrorLogin("Ooops! Wrong email or password. Please try again");
        }
      } catch (err) {
        console.log("ERROR-MESSAGE:", err);
      }
    }
  };

  // Function to handle logout
  const logout = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 204) {
        setIsLoggedIn(false);
        setLoggedInUser(null);
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
        registrationNewUser,
        login,
        logout,
        firstName,
        setFirstName,
        lastName,
        setLastName,
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
        errorEmailInfo,
        setErrorEmailInfo,
        errorPswInfo,
        setErrorPswInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
