import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import ProductCard from "./ProductCard";

const products = [
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
  {
    id: 4,
    name: "HP Notebook",
    type: "Laptop",
    img: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp",
    price: 999,
    quantity: 1,
    rating: 5,
  },
  {
    id: 5,
    name: "HP Envy",
    type: "Laptop",
    img: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/7.webp",
    price: 1099,
    quantity: 1,
    rating: 5,
  },
  {
    id: 6,
    name: "Toshiba B77",
    type: "Laptop",
    img: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/5.webp",
    price: 1299,
    quantity: 1,
    rating: 4,
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
