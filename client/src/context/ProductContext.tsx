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

export interface IProductContext {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  getAllProducts: () => void;
}

const defaultValues = {
  products: [],
  setProducts: () => {},
  getAllProducts: () => {},
};

export const ProductContext = createContext<IProductContext>(defaultValues);

export const useProductContext = () => useContext(ProductContext);

export const ProductProvider = ({ children }: PropsWithChildren<{}>) => {
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        getAllProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
