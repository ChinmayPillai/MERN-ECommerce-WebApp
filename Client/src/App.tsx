import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Terms from "./components/Login/Terms";
import Cart from "./components/Cart/Cart";
import { Item } from "./components/Cart/CartItem";
import { createContext, useReducer, useState } from "react";
import Home from "./components/Home/Home";

function reducer(items: Array<Item>, action: any): Array<Item> {
  console.log("Reducer");
  switch (action.type) {
    case "addItem":
      items.push(action.item);
      console.log(`Added Item, \nId: ${action.item.id}`);
      return items;
    case "removeItem":
      items.map((item, index) => {
        if (item.id === action.item.id) {
          items.splice(index, 1);
          console.log(`Removed Item, \nId: ${action.item.id}`);
          return items;
        }
      });
      return items;
    case "increment":
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
          item.quantity -= 1;
          console.log("Reduced by 1");
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

type ItemContextObject = {
  items: Item[];
  dispatch: React.Dispatch<{ type: string; item?: Item; items?: Item[] }>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
};

export const ItemContext = createContext<ItemContextObject>({
  items: [],
  dispatch: () => {},
  user: null,
  setUser: () => {},
});

function App() {
  const [user, setUser] = useState<any | null>(null);

  const [items, dispatch] = useReducer(reducer, []);
  /*
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
  ]);*/

  return (
    <ItemContext.Provider
      value={{
        items: items,
        dispatch: dispatch,
        user: user,
        setUser: setUser,
      }}
    >
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
