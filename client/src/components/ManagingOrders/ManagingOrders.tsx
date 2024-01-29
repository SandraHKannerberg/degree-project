import { useUserContext } from "../../context/UserContext";
import { useOrderContext } from "../../context/OrderContext";
import { useEffect, useState } from "react";
import { Col, Container, Pagination, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NoAdminAccess from "../Errors/NoAdminAccess";
import "./ManagingOrders.css";

// Component for managing orders
// You need to be logged in with admin auth to be able to access this ordercontent
// As an admin you can see all orders and mark them as shipped
function ManagingOrders() {
  const { orders, getOrders, message, markAsShipped } = useOrderContext();
  const { loggedInUser } = useUserContext();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15; //Orders per page

  // Count index for first and last product on current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    getOrders();
  }, []);

  // Handle checkbox-click to show if an order are shipped or not
  const handleShippedChange = async (id: string) => {
    markAsShipped(id);
  };

  return (
    <Container className="d-flex justify-content-center m-0 p-0">
      {/* Show all orders */}
      {loggedInUser?.isAdmin && orders && (
        <>
          {/* Wrapped container around orderhistory */}
          <Col xs={12} className="mt-4">
            {/* Message if no orders exists */}
            {message}

            <Link to={"/admin"} style={{ padding: 0 }} className="menu-link">
              <Col className="mt-3 mx-3">
                <h5>Go back</h5>
              </Col>
            </Link>
            <Col
              lg={12}
              className="d-flex flex-column align-items-center"
              style={{ width: "100vw" }}
            >
              <h3 className="text-center mb-4">Orders</h3>
            </Col>

            <Col
              lg={12}
              className="d-flex flex-column align-items-center"
              style={{ width: "100vw" }}
            >
              <Table className="table table-striped align-middle shadow-sm rounded">
                <thead>
                  <tr>
                    <th style={{ fontSize: "14px" }}>Date</th>
                    <th style={{ fontSize: "14px" }}>Ordernumber</th>
                    <th style={{ fontSize: "14px" }}>Customer</th>
                    <th style={{ fontSize: "14px" }}>Total</th>
                    <th className="text-center" style={{ fontSize: "14px" }}>
                      Shipped?
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order, index) => (
                    <tr key={index}>
                      <td
                        className="order-fontsize"
                        style={{ fontSize: "14px" }}
                      >
                        {order.createdAt}
                      </td>
                      <td
                        className="order-fontsize"
                        style={{ fontSize: "14px" }}
                      >
                        {order.orderNumber}
                      </td>
                      <td
                        className="order-fontsize"
                        style={{ fontSize: "14px" }}
                      >
                        {order.customer}
                      </td>
                      <td
                        className="order-fontsize"
                        style={{ fontSize: "14px" }}
                      >
                        {order.totalAmount} SEK
                      </td>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          className="form-check-input custom-checkbox"
                          checked={order.shipped}
                          onChange={() => handleShippedChange(order._id)}
                          id={`checkbox-${order._id}`}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Pagination */}
              <Pagination className="justify-content-center">
                {Array.from(
                  { length: Math.ceil(orders.length / ordersPerPage) },
                  (_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1)}
                      className="customize-pagination"
                    >
                      {index + 1}
                    </Pagination.Item>
                  )
                )}
              </Pagination>
            </Col>
          </Col>
        </>
      )}

      {!loggedInUser?.isAdmin ? <NoAdminAccess></NoAdminAccess> : null}
    </Container>
  );
}

export default ManagingOrders;
