import { BrowserRouter, Routes, Route } from "react-router-dom";
import Confirmation from "./pages/Confirmation";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import { ProductProvider } from "./context/ProductContext";
import ProductByCategory from "./components/ProductByCategory/ProductByCategory";

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/categories/:id" element={<ProductByCategory />} />
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
