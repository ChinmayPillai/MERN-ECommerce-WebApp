import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Terms from "./components/Login/Terms";
import Cart from "./components/Cart/Cart";
import { Item } from "./components/Cart/CartItem";
import { createContext, useReducer } from "react";
import Home from "./components/Home/Home";

function reducer(items: Array<Item>, action: any): Array<Item> {
  console.log("Reducer");
  switch (action.type) {
    case "addItem":
      {
        /*let increment = false;
      items.map((item) => {
        if (item === action.item) {
          increment = true;
        }
      });
      if (!increment) return [...items, action.item]; */
      }
      return [...items, action.item];
    case "removeItem":
      items.map((item, index) => {
        if (item === action.item) {
          items.splice(index, 1);
          return items;
        }
      });
      return items;
    case "increment":
      items.map((item) => {
        if (item === action.item) {
          item.quantity += 0.5;
          console.log("Increased by 1");
          return items;
        }
      });
      return items;
    case "decrement":
      items.map((item) => {
        if (item === action.item && item.quantity >= 0.5) {
          item.quantity -= 0.5;
          console.log("Reduced by 1");
          return items;
        }
      });
      return items;
    default:
      console.log("Unknown action");
      return items;
  }
}

type ItemContextObject = {
  items: Item[];
  dispatch: React.Dispatch<{ type: string; item: Item }>;
};

export const ItemContext = createContext<ItemContextObject>({
  items: [],
  dispatch: () => {},
});

function App() {
  const [items, dispatch] = useReducer(reducer, [
    {
      id: 1,
      name: "Cotton T-Shirt 1",
      type: "Shirt",
      img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp",
      price: 20,
      quantity: 1,
      rating: 4,
    },
    {
      id: 2,
      name: "Cotton T-Shirt 2",
      type: "Shirt",
      img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img6.webp",
      price: 10,
      quantity: 1,
      rating: 3,
    },
    {
      id: 3,
      name: "Cotton T-Shirt 3",
      type: "Shirt",
      img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img7.webp",
      price: 5,
      quantity: 1,
      rating: 2,
    },
  ]);

  return (
    <ItemContext.Provider value={{ items: items, dispatch: dispatch }}>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="terms" element={<Terms />} />
        </Route>
      </Routes>
    </ItemContext.Provider>
  );
}

export default App;
