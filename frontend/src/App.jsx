import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import ProductList from "./components/productList";
import Profile from "./components/profile";
import ProductDetails from "./components/productDetails";
import OrderForm from "./components/orderForm";
import Success from "./components/success";
import EmailForm from "./components/emailForm";
import ProductForm from "./components/productForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/details/:productId" element={<ProductDetails />} />
        <Route path="/orderform/:productId" element={<OrderForm />} />
        <Route path="/success" element={<Success />} />
        <Route path="/emailform" element={<EmailForm />} />
        <Route path="/productform" element={<ProductForm />} />
      </Routes>
    </Router>
  );
}

export default App;
