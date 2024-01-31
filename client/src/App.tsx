import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { UserProvider } from "./context/UserContext";
import NoPage404 from "./components/Errors/NoPage404";
import Loader from "./components/Loader/Loader";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

//LazyLoaing
const Home = React.lazy(() => import("./pages/Home/Home"));
const Shop = React.lazy(() => import("./pages/Shop/Shop"));
const About = React.lazy(() => import("./pages/About/About"));
const ContactUs = React.lazy(() => import("./pages/ContactUs/ContactUs"));
const Confirmation = React.lazy(
  () => import("./pages/Confirmation/Confirmation")
);
const ProductDetails = React.lazy(() => import("./pages/Shop/ProductDetails"));
const ProductsCategory = React.lazy(
  () => import("./pages/Shop/ProductsCategory")
);
const User = React.lazy(() => import("./pages/User/User"));
const Admin = React.lazy(() => import("./pages/Admin/Admin"));
const Orders = React.lazy(() => import("./components/Orders/Orders"));
const ManagingOrders = React.lazy(
  () => import("./components/ManagingOrders/ManagingOrders")
);
const ManagingProducts = React.lazy(
  () => import("./components/ManagingProducts/ManagingProducts")
);
const AddProductForm = React.lazy(
  () => import("./components/AddProductForm/AddProductForm")
);

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <UserProvider>
          <ProductProvider>
            <OrderProvider>
              <ScrollToTop />
              <Routes>
                <Route
                  path="/"
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <Home />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/shop"
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <Shop />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <About />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <ContactUs />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/confirmation"
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <Confirmation />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/categories/:id"
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <ProductsCategory />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/product/:id"
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <ProductDetails />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/loggedin"
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <User />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/loggedin/orders"
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <Orders />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <Admin />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <ManagingOrders />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <ManagingProducts />
                    </React.Suspense>
                  }
                />
                <Route
                  path="/admin/addproduct"
                  element={
                    <React.Suspense fallback={<Loader />}>
                      <AddProductForm />
                    </React.Suspense>
                  }
                />
                {/* Fallback */}
                <Route path="*" element={<NoPage404 />} />
              </Routes>
            </OrderProvider>
          </ProductProvider>
        </UserProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
