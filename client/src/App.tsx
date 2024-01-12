import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import ContactUs from "./pages/ContactUs/ContactUs";
import Confirmation from "./pages/Confirmation";
import ProductDetails from "./pages/Shop/ProductDetails";
import ProductsCategory from "./pages/Shop/ProductsCategory";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/categories/:id" element={<ProductsCategory />} />
          <Route path="/:id" element={<ProductDetails />} />
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
