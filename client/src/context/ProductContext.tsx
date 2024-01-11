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
  categories: string[];
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

      const productData = await responseFetchProducts.json();
      setProducts(productData);
    } catch (err) {
      console.log(err);
    }
  };

  //Get all categories
  const getAllCategories = async () => {
    try {
      const responseFetchCategories = await fetch("api/categories");

      // Check response status
      if (!responseFetchCategories.ok) {
        throw new Error("Failed to fetch categories");
      }

      const categoryData = await responseFetchCategories.json();
      setCategories(categoryData);
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
