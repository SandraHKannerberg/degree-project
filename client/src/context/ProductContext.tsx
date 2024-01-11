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
  brand?: string;
  description: string;
  careAdvice?: string;
  features?: string[];
  price: number;
  image: string;
  inStock: number;
  categories?: string[];
  stripeProductId: string;
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
  categories: Category[];
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
}

const defaultValues = {
  products: [],
  setProducts: () => {},
  getAllProducts: () => {},
  categories: [],
  setCategories: () => {},
  getAllCategories: () => {},
};

export const ProductContext = createContext<IProductContext>(defaultValues);

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }: PropsWithChildren<{}>) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  //Get all products
  const getAllProducts = async () => {
    try {
      const responseFetchProducts = await fetch("api/products");

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

  //Get all categories in the shop
  const getAllCategories = async () => {
    try {
      const responseFetchCategories = await fetch("/api/categories");

      // Check response status
      if (!responseFetchCategories.ok) {
        const errorText = await responseFetchCategories.text();
        throw new Error(
          `Failed to fetch categories. Server response: ${errorText}`
        );
      }

      const categoriesData = await responseFetchCategories.json();
      setCategories(categoriesData);
    } catch (err) {
      console.log(err);
    }
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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
