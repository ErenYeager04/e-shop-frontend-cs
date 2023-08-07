
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"
// Pages and components
import NavBar from './components/Navbar'
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetails";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";

function App() {
  const {userId} = useSelector((state) => state.user)
  return (
    <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route 
            path="/"
            element={<Home/>}
          />
          <Route
            path="/login"
            element={userId ? <Navigate to="/"/> : <Login/>}
          />
          <Route 
            path="/signup"
            element={userId ? <Navigate to="/"/> : <Signup/>}
          />
          <Route 
            path="/product/:id"
            element={<ProductDetail/>}
          />
          <Route 
            path="/admin"
            element={userId ? <Admin/> : <Navigate to="/login"/>}
          />
          <Route 
            path="/cart"
            element={<Cart/> }
          />
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
