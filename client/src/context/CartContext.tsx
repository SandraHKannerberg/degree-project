import {
  createContext,
  useContext,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";

export interface CartItem {
  id: string; //Id from stripePriceId
  quantity: number;
}

export interface ICartContext {
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  addToCart: (id: string) => void;
  getCartItemQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  emptyCart: () => void;
  cartTotalQuantity: number;
}

const defaultValues = {
  cartItems: [],
  setCartItems: () => {},
  addToCart: () => "",
  getCartItemQuantity: () => {},
  decreaseCartQuantity: () => {},
  removeFromCart: () => {},
  emptyCart: () => {},
  cartTotalQuantity: 0,
};

export const CartContext = createContext<ICartContext>(defaultValues);

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  // Count total items in cart
  const cartTotalQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  // This function handle the quantity of every cartItem in the shoppingcart
  function getCartItemQuantity(id: string) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  // Function to add a product to shoppingcart or increase the quantity if the product already in cart
  function addToCart(id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  // Function to be able to decrease cartitem quantity
  function decreaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  // Remove item from cart
  function removeFromCart(id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  // This functions empty the cart
  function emptyCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        getCartItemQuantity,
        cartTotalQuantity,
        decreaseCartQuantity,
        removeFromCart,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};