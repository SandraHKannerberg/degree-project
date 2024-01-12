import { BrowserRouter, Routes, Route } from "react-router-dom";
import Confirmation from "./pages/Confirmation";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import { ProductProvider } from "./context/ProductContext";
import ProductDetails from "./pages/Shop/ProductDetails";
import ProductsCategory from "./pages/Shop/ProductsCategory";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/categories/:id" element={<ProductsCategory />} />
          <Route path="/:id" element={<ProductDetails />} />
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
