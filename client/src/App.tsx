import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import ContactUs from "./pages/ContactUs/ContactUs";
import Confirmation from "./pages/Confirmation/Confirmation";
import ProductDetails from "./pages/Shop/ProductDetails";
import ProductsCategory from "./pages/Shop/ProductsCategory";
import UserProvider from "./context/UserContext";
import User from "./pages/User/User";
import Admin from "./pages/Admin/Admin";
import Orders from "./components/Orders/Orders";
import ManagingOrders from "./components/ManagingOrders/ManagingOrders";
import ManagingProducts from "./components/ManagingProducts/ManagingProducts";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <UserProvider>
          <ProductProvider>
            <OrderProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/confirmation" element={<Confirmation />} />
                <Route path="/categories/:id" element={<ProductsCategory />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/mypage" element={<User />} />
                <Route path="/mypage/orders" element={<Orders />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/orders" element={<ManagingOrders />} />
                <Route path="/admin/products" element={<ManagingProducts />} />
              </Routes>
            </OrderProvider>
          </ProductProvider>
        </UserProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
