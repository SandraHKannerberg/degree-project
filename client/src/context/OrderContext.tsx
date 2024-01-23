import { format } from "date-fns"; // date formatters
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

export interface deliveryAddress {
  street: string;
  postal_code: string;
  city: string;
  country: string;
}

export interface ShippingMethod {
  amount_total: number;
  id: string; //Id from Stripe
}

export interface Order {
  createdAt: string;
  orderNumber: number;
  customer: string; // Name
  email: string;
  orderItems: OrderItem[];
  totalOrderItemsAmount: number; // Excluding shipping
  totalAmount: number; // Including shipping
  deliveryAddress: deliveryAddress;
  shipped: boolean;
  shippingMethod: ShippingMethod;
  stripePaymentIntentId?: string;
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
      const response = await fetch("/api/orders");
      const orderData = await response.json();

      // If a user has no order - show this message
      if (response.status === 203) {
        setMessage("No orders to show");
        setOrders([]);
      }

      // If OK and there are orders to show create the orderlist
      if (response.status === 200) {
        setMessage("");

        //Create orderlist
        const orderList = orderData.map((order: Order) => {
          // Formatte the date from database
          const formattedDate = format(new Date(order.createdAt), "yyyy-MM-dd");

          return {
            createdAt: formattedDate,
            orderNumber: order.orderNumber,
            customer: order.customer,
            email: order.email,
            orderItems: order.orderItems.map((item) => ({
              product: item.product,
              price: item.price,
              quantity: item.quantity,
            })),
            totalOrderItemsAmount: order.totalOrderItemsAmount,
            totalAmount: order.totalAmount,
            deliveryAddress: {
              street: order.deliveryAddress.street,
              postal_code: order.deliveryAddress.postal_code,
              city: order.deliveryAddress.city,
              country: order.deliveryAddress.country,
            },
            shipped: order.shipped,
            shippingMethod: {
              amount_total: order.shippingMethod.amount_total,
            },
            shippingStripeId: order.shippingMethod.id,
            stripePaymentIntentId: order.stripePaymentIntentId,
          };
        });

        // Sort the orderlist - newest to oldest order by date
        const sortedOrderList = orderList.slice().sort((a: Order, b: Order) => {
          //Convert the 'created' string to Date object
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();

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
