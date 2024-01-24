import { useUserContext } from "../../context/UserContext";
import { useOrderContext } from "../../context/OrderContext";
import { useEffect } from "react";
import { Container } from "react-bootstrap";

// Component for managing orders
// You need to be logged in with admin auth to be able to access this ordercontent
// As an admin you can see all orders and mark them as shipped
function ManagingOrders() {
  const { orders, getOrders, message, markAsShipped } = useOrderContext();
  const { loggedInUser } = useUserContext();

  useEffect(() => {
    getOrders();
  }, []);

  // Handle checkbox-click to show if an order are shipped or not
  const handleShippedChange = async (id: string) => {
    markAsShipped(id);
  };

  return (
    <>
      {/* Show all orders */}
      {loggedInUser?.isAdmin && orders && (
        <>
          {/* Wrapped container around orderhistory */}
          <Container fluid className="mx-1">
            {/* Message if no orders exists */}
            {message}

            <h1>Orders</h1>
            <table className="table table-striped align-middle shadow-sm rounded">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Ordernumber</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th className="text-center">Shipped?</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.createdAt}</td>
                    <td>{order.orderNumber}</td>
                    <td>{order.customer}</td>
                    <td>{order.totalAmount} SEK</td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={order.shipped}
                        onChange={() => handleShippedChange(order._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Container>
        </>
      )}
    </>
  );
}

export default ManagingOrders;