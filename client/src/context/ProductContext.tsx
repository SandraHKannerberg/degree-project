import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";

//Exsisting product
export interface Product {
  _id: string;
  title: string;
  brand: string;
  description: string;
  careAdvice?: string; // not required
  features?: string[]; // not required
  price: number;
  image: string;
  inStock: number;
  categories?: string[]; // not required
}

//New product
export interface NewProduct {
  title: string;
  brand?: string;
  description: string;
  careAdvice?: string;
  features?: string[];
  price: number;
  image: string;
  inStock: number;
  categories?: string[];
}

//Category
export interface Category {
  _id: string;
  title: string;
  description: string;
}

export interface IProductContext {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  getAllProducts: () => void;
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
  getAllCategories: () => void;
  deleteProductFromDatabase: (id: string) => void;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  brand: string;
  setBrand: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  price: number;
  setPrice: Dispatch<SetStateAction<number>>;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  inStock: number;
  setInStock: Dispatch<SetStateAction<number>>;
  careAdvice: string;
  setCareAdvice: Dispatch<SetStateAction<string>>;
  features: string[];
  setFeatures: Dispatch<SetStateAction<string[]>>;
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
}

const defaultValues = {
  products: [],
  setProducts: () => {},
  getAllProducts: () => {},
  categories: [],
  setCategories: () => {},
  getAllCategories: () => {},
  deleteProductFromDatabase: () => {},
  title: "",
  setTitle: () => {},
  brand: "",
  setBrand: () => {},
  description: "",
  setDescription: () => {},
  price: 0,
  setPrice: () => {},
  image: "",
  setImage: () => {},
  inStock: 0,
  setInStock: () => {},
  careAdvice: "",
  setCareAdvice: () => {},
  features: [],
  setFeatures: () => {},
  success: false,
  setSuccess: () => {},
};

export const ProductContext = createContext<IProductContext>(defaultValues);

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }: PropsWithChildren<{}>) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [inStock, setInStock] = useState(0);
  const [careAdvice, setCareAdvice] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);


  const BACKEND_URL="https://degree-project.onrender.com";

  //Get all products
  const getAllProducts = async () => {
    try {
      const responseFetchProducts = await fetch(`${BACKEND_URL}/api/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check response status
      if (!responseFetchProducts.ok) {
        throw new Error("Failed to fetch products");
      }

      const products = await responseFetchProducts.json();
      setProducts(products);
    } catch (err) {
      console.log(err);
    }
  };

  //Get all categories in the shop and save them in localStorage to sustainably save category-data at refresh
  const getAllCategories = async () => {
    try {
      // Get categories from localStorage (cached data)
      const cachedCategories = localStorage.getItem('/api/categories');

      // If there is cached data, set it to state and return
      if (cachedCategories) {
        setCategories(JSON.parse(cachedCategories));
        return;
      }

      const responseFetchCategories = await fetch(`${BACKEND_URL}/api/categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Response status?
      if (!responseFetchCategories.ok) {
        const errorText = await responseFetchCategories.text();
        throw new Error(
          `Failed to fetch categories. Server response: ${errorText}`
        );
      }

      const categoriesData = await responseFetchCategories.json();

      // Save categories in localStorage
      localStorage.setItem("categories", JSON.stringify(categoriesData));

      setCategories(categoriesData);
    } catch (err) {
      console.log(err);
    }
  };

  // -----------------------------------Admin functions ----------------------------------------//

  // Function to delete a product in the database from the Admin panel
  const deleteProductFromDatabase = (id: string) => {
    const url = `${BACKEND_URL}/api/products` + id;
    fetch(url, { method: "DELETE" })
      .then((response) => {
        if (!response) {
          throw new Error(
            "ERROR - Something went wrong, the product with " +
              id +
              " is not deleted"
          );
        }

        getAllProducts();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        getAllProducts,
        categories,
        setCategories,
        getAllCategories,
        title,
        setTitle,
        brand,
        setBrand,
        description,
        setDescription,
        price,
        setPrice,
        image,
        setImage,
        inStock,
        setInStock,
        careAdvice,
        setCareAdvice,
        features,
        setFeatures,
        deleteProductFromDatabase,
        success,
        setSuccess,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
