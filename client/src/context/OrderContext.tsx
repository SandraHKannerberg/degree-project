import {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";

export interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface ShippingMethod {
  amount: number;
  id: string; //Id from Stripe
}

export interface Order {
  created: string;
  orderNumber: number;
  customer: string; // Name
  email: string;
  products: OrderItem[];
  totalOrderItemsAmount: number; // Excluding shipping
  totalAmount: number; // Including shipping
  deliveryAddress: Address;
  shipped: boolean;
  shippingMethod: ShippingMethod;
  stripePaymentIntentId: string;
}

export interface IOrderContext {
  orders: Order[];
  setOrders: Dispatch<SetStateAction<Order[]>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  getOrders: () => void;
}

const defaultValues = {
  orders: [],
  setOrders: () => {},
  message: "",
  setMessage: () => {},
  getOrders: () => {},
};

export const OrderContext = createContext<IOrderContext>(defaultValues);

export const useOrderContext = () => useContext(OrderContext);

export const OrderProvider = ({ children }: PropsWithChildren<{}>) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [message, setMessage] = useState("");

  // Function to get orderhistory
  const getOrders = async () => {
    try {
      const response = await fetch("api/orders");
      const orderData = await response.json();

      if (response.status === 203) {
        setMessage("No orders to show");
        setOrders([]);
      }

      if (response.status === 200) {
        setMessage("");

        //Create orderlist
        const orderList = orderData.map((order: Order) => ({
          created: order.created,
          orderNumber: order.orderNumber,
          customer: order.customer,
          email: order.email,

          products: order.products.map((product) => ({
            product: product.product,
            price: product.price,
            quantity: product.quantity,
          })),

          totalOrderItemsAmount: order.totalOrderItemsAmount,
          totalAmount: order.totalAmount,

          street: order.deliveryAddress.street,
          postal_code: order.deliveryAddress.postalCode,
          city: order.deliveryAddress.city,
          country: order.deliveryAddress.country,

          shipped: order.shipped,
          shippingAmount: order.shippingMethod.amount,
          shippingStripeId: order.shippingMethod.id,

          stripePaymentIntentId: order.stripePaymentIntentId,
        }));

        const sortedOrderList = orderList.slice().sort((a: Order, b: Order) => {
          //Convert the 'created' string to Date object
          const dateA = new Date(a.created).getTime();
          const dateB = new Date(b.created).getTime();

          //Sort the list - newest order first
          return dateB - dateA;
        });

        setOrders(sortedOrderList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        message,
        setMessage,
        getOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
