import {
  createContext,
  useContext,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";

import useLocalStorage from "../hooks/useLocalStorage";

export interface CartItem {
  id: string; //Id from database
  name: string; //Product title from database
  price: number; //Price from database
  quantity: number;
}

export interface ICartContext {
  cartItems: CartItem[];
  setCartItems: Dispatch<SetStateAction<CartItem[]>>;
  addToCart: (id: string, name: string, price: number) => void;
  getCartItemQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  emptyCart: () => void;
  cartTotalQuantity: number;
  handlePayment: () => void;
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
  handlePayment: () => {},
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
  function addToCart(id: string, name: string, price: number) {
    //Get the quantity
    const quantity = getCartItemQuantity(id);

    if (quantity === 0) {
      //If product not in cart
      setCartItems([
        ...cartItems,
        {
          id: id,
          name: name,
          price: price,
          quantity: 1,
        },
      ]);
    } else {
      //If product already in cart
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
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

  // This function handle payment and connect to Stripe Checkout
  async function handlePayment() {
    const cartToStripe = cartItems.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    console.log(cartToStripe);

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cartToStripe }),
    });

    if (!response.ok) {
      return;
    }

    //Save session id to localStorage
    const { url, sessionId } = await response.json();
    localStorage.setItem("session-id", sessionId);
    window.location = url;
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
        handlePayment,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
