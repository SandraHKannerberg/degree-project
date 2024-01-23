import { useUserContext } from "../../context/UserContext";
import { useOrderContext } from "../../context/OrderContext";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

// Component to show orderhistory.
// Regular users can see their own orders
// Admin can see all orders
function Orders() {
  const { orders, getOrders, message } = useOrderContext();
  const { loggedInUser } = useUserContext();

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {/* Orderhistory for regular user */}
      {loggedInUser && orders && (
        <>
          {/* Wrapped container around orderhistory */}
          <Container className="mx-1">
            <p>{message}</p>
            <h1>My Orderhistory</h1>
            {orders.map((order, orderIndex) => (
              <Row
                key={orderIndex}
                lg={12}
                style={{ borderBottom: "1px solid #DFD3C3" }}
              >
                <Row className="mt-3">
                  <Col>
                    <p style={{ fontWeight: "bold", margin: 0 }}>
                      Ordernumber:
                    </p>
                    {order.orderNumber}
                  </Col>
                  <Col>{order.createdAt}</Col>
                </Row>

                <Row className="mt-3">
                  <p style={{ fontWeight: "bold", margin: 0 }}>
                    Deliveryaddress
                  </p>
                  <p style={{ margin: 0 }}>{order.customer}</p>
                  <p style={{ margin: 0 }}>{order.deliveryAddress.street}</p>
                  <p style={{ margin: 0 }}>
                    {order.deliveryAddress.postal_code}
                  </p>
                  <p style={{ margin: 0 }}>
                    {order.deliveryAddress.city},{" "}
                    {order.deliveryAddress.country}
                  </p>
                </Row>

                <Row className="mt-3">
                  <p style={{ fontWeight: "bold", margin: 0 }}>Orderdetails</p>
                  <ul style={{ margin: 0 }}>
                    {order.orderItems.map((item, itemIndex) => (
                      <li key={itemIndex} style={{ listStyle: "none" }}>
                        <p style={{ margin: 0 }}>
                          {item.product} --- {item.quantity} piece, {item.price}{" "}
                          SEK
                        </p>
                      </li>
                    ))}
                  </ul>
                  <p style={{ margin: 0 }}>
                    Shipping {order.shippingMethod.amount_total} SEK
                  </p>

                  <h6 className="mt-2">
                    <span style={{ fontWeight: "bold" }}>ORDER TOTAL --- </span>{" "}
                    {order.totalAmount} SEK
                  </h6>
                </Row>

                <Row className="mt-1">
                  <p style={{ fontSize: "14px" }}>
                    Confirmation was sent to {order.email}
                  </p>
                </Row>
              </Row>
            ))}
          </Container>
        </>
      )}
    </>
  );
}

export default Orders;
