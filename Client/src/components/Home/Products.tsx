import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import ProductCard from "./ProductCard";

const products = [
  {
    id: 1,
    name: "Cotton Shirt",
    type: "Shirt",
    img: "https://images.pexels.com/photos/7752813/pexels-photo-7752813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 20,
    quantity: 1,
    rating: 4,
  },
  {
    id: 2,
    name: "Wool Sweater",
    type: "Sweater",
    img: "https://images.pexels.com/photos/789303/pexels-photo-789303.jpeg",
    price: 100,
    quantity: 1,
    rating: 5,
  },
  {
    id: 3,
    name: "Blue Denim Jacket",
    type: "Jacket",
    img: "https://images.pexels.com/photos/2765557/pexels-photo-2765557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 40,
    quantity: 1,
    rating: 4,
  },
  {
    id: 4,
    name: "HP Notebook",
    type: "Laptop",
    img: "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/4.webp",
    price: 999,
    quantity: 1,
    rating: 3,
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
  {
    id: 7,
    name: "Necklace",
    type: "Jewellery",
    img: "https://images.pexels.com/photos/12026054/pexels-photo-12026054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 599,
    quantity: 1,
    rating: 4,
  },
  {
    id: 8,
    name: "Tudor Watch",
    type: "Watch",
    img: "https://images.pexels.com/photos/9561293/pexels-photo-9561293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 2799,
    quantity: 1,
    rating: 5,
  },
  {
    id: 9,
    name: "Diamond Ring",
    type: "Jewellery",
    img: "https://images.pexels.com/photos/9332183/pexels-photo-9332183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 3599,
    quantity: 1,
    rating: 3,
  },
  {
    id: 10,
    name: "Sofa",
    type: "Furniture",
    img: "https://images.pexels.com/photos/11112735/pexels-photo-11112735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 999,
    quantity: 1,
    rating: 3,
  },
  {
    id: 11,
    name: "Table",
    type: "Furniture",
    img: "https://images.pexels.com/photos/11112739/pexels-photo-11112739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
