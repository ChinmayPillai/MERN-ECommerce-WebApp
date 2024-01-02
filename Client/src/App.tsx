import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Terms from "./components/Login/Terms";
import Cart from "./components/Cart/Cart";
import Wishlist from "./components/Wishlist/Wishlist";
import Orders from "./components/Orders/Orders";
import { Item } from "./components/Cart/CartItem";
import { createContext, useReducer, useState } from "react";
import Home from "./components/Home/Home";
import axios from "axios";

function reducer(items: Array<Item>, action: any): Array<Item> {
  console.log("Reducer");
  switch (action.type) {
    case "addItem":
      items.push(action.item);
      axios.post(action.url, { item: action.item });
      console.log(`Added Item, Id: ${action.item.id}`);
      return items;
    case "removeItem":
      axios.put(action.url, { item: action.item, action: "delete" });
      items.map((item, index) => {
        if (item.id === action.item.id) {
          items.splice(index, 1);
          console.log(`Removed Item, Id: ${action.item.id}`);
          return items;
        }
      });
      return items;
    case "increment":
      console.log("Increment");
      axios.put(action.url, { item: action.item, action: "increment" });
      items.map((item) => {
        if (item.id === action.item.id) {
          item.quantity += 1;
          console.log("Increased by 1");
          return items;
        }
      });
      return items;
    case "decrement":
      items.map((item) => {
        if (item.id === action.item.id && item.quantity >= 1) {
          axios.put(action.url, { item: action.item, action: "decrement" });
          item.quantity -= 1;
          console.log("Reduced by 1");
          return items;
        }
      });
      return items;
    case "clear":
      console.log("Clear");
      axios.put(action.url, { action: "clear" });
      items = [];
      return items;
    case "setItems":
      items = action.items;
      return items;
    default:
      console.log("Unknown action");
      return items;
  }
}

function Wishlistreducer(items: Array<Item>, action: any): Array<Item> {
  console.log("Wishlist Reducer");
  switch (action.type) {
    case "addItem":
      items.push(action.item);
      axios.post(action.url, { item: action.item });
      console.log(`Added Wishlist Item, Id: ${action.item.id}`);
      return items;
    case "removeItem":
      axios.put(action.url, { item: action.item, action: "delete" });
      items.map((item, index) => {
        if (item.id === action.item.id) {
          items.splice(index, 1);
          console.log(`Removed Wishlist Item, Id: ${action.item.id}`);
          return items;
        }
      });
      return items;
    case "setItems":
      items = action.items;
      return items;
    default:
      console.log("Unknown action");
      return items;
  }
}

function Ordersreducer(items: Array<Item>, action: any): Array<Item> {
  console.log("Orders Reducer");
  switch (action.type) {
    case "addItem":
      items.unshift(action.item);
      axios.post(action.url, { item: action.item });
      console.log(`Added Order Item, Id: ${action.item.id}`);
      return items;
    case "update":     
      axios.put(action.url, { items: action.items });
      action.items.map(async (item: Item) => {
        items.unshift(item);
      }); 
      console.log(`Updated Orders`);
      return items;
    case "setItems":
      items = action.items;
      return items;
    default:
      console.log("Unknown action");
      return items;
  }
}

type ItemContextObject = {
  items: Item[];
  dispatch: React.Dispatch<{
    type: string;
    item?: Item;
    items?: Item[];
    url?: string;
  }>;
  wishlist: Item[];
  wishlistDispatch: React.Dispatch<{
    type: string;
    item?: Item;
    items?: Item[];
    url?: string;
  }>;
  orders: Item[];
  ordersDispatch: React.Dispatch<{
    type: string;
    item?: Item;
    items?: Item[];
    url?: string;
  }>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
};

export const ItemContext = createContext<ItemContextObject>({
  items: [],
  dispatch: () => {},
  wishlist: [],
  wishlistDispatch: () => {},
  orders: [],
  ordersDispatch: () => {},
  user: null,
  setUser: () => {},
});

function App() {
  const [user, setUser] = useState<any | null>(null);

  const [items, dispatch] = useReducer(reducer, []);

  const [wishlist, wishlistDispatch] = useReducer(Wishlistreducer, []);
  
  const [orders, ordersDispatch] = useReducer(Ordersreducer, []);

  return (
    <ItemContext.Provider
      value={{
        items: items,
        dispatch: dispatch,
        wishlist: wishlist,
        wishlistDispatch: wishlistDispatch,
        orders: orders,
        ordersDispatch: ordersDispatch,
        user: user,
        setUser: setUser,
      }}
    >
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="login" element={<Login />} />
          <Route path="terms" element={<Terms />} />
        </Route>
      </Routes>
    </ItemContext.Provider>
  );
}

export default App;
