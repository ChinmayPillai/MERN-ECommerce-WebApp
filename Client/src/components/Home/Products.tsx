import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Cotton Shirt",
    type: "Shirt",
    img: "Product_Images/cotton_shirt.jpg",
    price: 20,
    quantity: 1,
    rating: 4,
  },
  {
    id: 2,
    name: "Wool Sweater",
    type: "Sweater",
    img: "Product_Images/wool_sweater.jpg",
    price: 100,
    quantity: 1,
    rating: 5,
  },
  {
    id: 3,
    name: "Blue Denim Jacket",
    type: "Jacket",
    img: "Product_Images/denim_jacket.jpg",
    price: 40,
    quantity: 1,
    rating: 4,
  },
  {
    id: 4,
    name: "HP Notebook",
    type: "Laptop",
    img: "Product_Images/hp_notebook.jpg",
    price: 999,
    quantity: 1,
    rating: 3,
  },
  {
    id: 5,
    name: "HP Envy",
    type: "Laptop",
    img: "Product_Images/hp_envy.jpg",
    price: 1099,
    quantity: 1,
    rating: 5,
  },
  {
    id: 6,
    name: "Toshiba B77",
    type: "Laptop",
    img: "Product_Images/toshiba_b77.jpg",
    price: 1299,
    quantity: 1,
    rating: 4,
  },
  {
    id: 7,
    name: "Necklace",
    type: "Jewellery",
    img: "Product_Images/necklace.jpg",
    price: 599,
    quantity: 1,
    rating: 4,
  },
  {
    id: 8,
    name: "Tudor Watch",
    type: "Watch",
    img: "Product_Images/tudor_watch.jpg",
    price: 2799,
    quantity: 1,
    rating: 5,
  },
  {
    id: 9,
    name: "Diamond Ring",
    type: "Jewellery",
    img: "Product_Images/diamond_ring.jpg",
    price: 3599,
    quantity: 1,
    rating: 3,
  },
  {
    id: 10,
    name: "Sofa",
    type: "Furniture",
    img: "Product_Images/sofa.jpg",
    price: 999,
    quantity: 1,
    rating: 3,
  },
  {
    id: 11,
    name: "Table",
    type: "Furniture",
    img: "Product_Images/table.jpg",
    price: 399,
    quantity: 1,
    rating: 5,
  },
];

function Products() {
  return (
    <MDBContainer fluid className="my-5">
      <MDBRow>
        {products.map((item, index) => (
          <ProductCard key={index} item={item} />
        ))}
      </MDBRow>
    </MDBContainer>
  );
}

export default Products;
