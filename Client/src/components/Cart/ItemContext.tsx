import { Item } from "./CartItem";
import { createContext, useReducer } from "react";

const item1: Item = {
  name: "Cotton T-Shirt 1",
  type: "Shirt",
  img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img5.webp",
  price: 20,
};

const item2: Item = {
  name: "Cotton T-Shirt 2",
  type: "Shirt",
  img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img6.webp",
  price: 10,
};

const item3: Item = {
  name: "Cotton T-Shirt 3",
  type: "Shirt",
  img: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img7.webp",
  price: 5,
};

function reducer(items: Array<Item>, action: any): Array<Item> {
  switch (action.type) {
    case "addItem":
      return [...items, action.item];
    default:
      return items;
  }
}

type ItemContextObject = {
  items: Item[];
  dispatchCart: React.Dispatch<any>;
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
