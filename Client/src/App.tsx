import { Routes, Route } from "react-router-dom";
import { createContext, useReducer } from "react";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Terms from "./components/Login/Terms";
import Cart from "./components/Cart/Cart";
import { Item } from "./components/Cart/CartItem";
import { ItemContextProvider } from "./components/Cart/ItemContext";

function App() {
  return (
    <ItemContextProvider>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="terms" element={<Terms />} />
        </Route>
      </Routes>
    </ItemContextProvider>
  );
}

export default App;
