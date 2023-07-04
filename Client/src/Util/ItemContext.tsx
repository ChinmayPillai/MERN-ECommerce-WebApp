import { Item } from "../components/Cart/CartItem";
import { createContext, useReducer } from "react";

const item1: Item = {
  id: 1,
  name: "Cotton T-Shirt 1",
  type: "Shirt",
  img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp",
  price: 20,
  quantity: 1,
};

const item2: Item = {
  id: 2,
  name: "Cotton T-Shirt 2",
  type: "Shirt",
  img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img6.webp",
  price: 10,
  quantity: 1,
};

const item3: Item = {
  id: 3,
  name: "Cotton T-Shirt 3",
  type: "Shirt",
  img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img7.webp",
  price: 5,
  quantity: 1,
};

function reducer(items: Array<Item>, action: any): Array<Item> {
  console.log("Reducer");
  switch (action.type) {
    case "addItem":
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
        if (item === action.item && item.quantity >= 1) {
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
  dispatchCart: React.Dispatch<{ type: string; item: Item }>;
};

type ItemContextProviderProps = {
  children: React.ReactNode;
};

export const ItemContext = createContext<ItemContextObject>({
  items: [],
  dispatchCart: () => {},
});

export const ItemContextProvider = ({ children }: ItemContextProviderProps) => {
  const [items, dispatchCart] = useReducer(reducer, [item1, item2, item3]);

  return (
    <ItemContext.Provider value={{ items: items, dispatchCart: dispatchCart }}>
      {children}
    </ItemContext.Provider>
  );
};
