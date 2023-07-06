import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Item } from "../Cart/CartItem";
import { ItemContext } from "../../App";
import { useContext } from "react";
import axios from "axios";

interface Props {
  item: Item;
}

const addToCartUrlBase = "http://localhost:3000/cart/";
let addToCartUrl = addToCartUrlBase;

export default function ProductCard({ item }: Props) {
  const cart = useContext(ItemContext);
  if (cart.user) {
    addToCartUrl = addToCartUrlBase + cart.user._id;
  }

  function addToCart() {
    console.log("Adding to Cart");
    if (!cart.user) {
      alert("Please login");
      return;
    }

    cart.items.map((cartItem) => {
      if (cartItem.id === item.id) {
        axios.post(addToCartUrl, { type: "increment", item: item });
        return;
      }
    });

    axios.post(addToCartUrl, { type: "addItem", item: item });
    return;
  }

  const stars = [];
  if (item.rating) {
    for (let i = 0; i < item.rating; i++) {
      stars.push(<MDBIcon fas icon="star" />);
    }
    for (let i = item.rating; i < 5; i++) {
      stars.push(<MDBIcon far icon="star" />);
    }
  }

  return (
    <MDBCol md="12" lg="4" className="mb-4 mb-lg-0">
      <MDBCard>
        <MDBCardImage
          src={item.img}
          position="top"
          alt={item.name}
          width="30%"
          height="auto"
        />
        <MDBCardBody>
          <div className="d-flex justify-content-between">
            <p className="small">{item.type}</p>
            <div className="ms-auto text-warning">{item.rating && stars}</div>
            {/*<p className="small">
              <a href="#!" className="text-muted">
                Laptops
              </a>
            </p>
            <p className="small text-danger">
              <s>$1099</s>
            </p>*/}
          </div>

          <div className="d-flex justify-content-between mb-3">
            <h5 className="mb-0">{item.name}</h5>
            <h5 className="text-dark mb-0">$ {item.price}</h5>
          </div>
          <div className="d-flex flex-row">
            {/*<MDBBtn
              color="primary"
              rippleColor="dark"
              className="flex-fill ms-1"
            >
              Learn more
            </MDBBtn>*/}
            <MDBBtn
              color="danger"
              className="flex-fill ms-2"
              onClick={addToCart}
            >
              Add to Cart
            </MDBBtn>
          </div>

          {/*<div className="d-flex justify-content-between mb-2">
            <p className="text-muted mb-0">
              Available: <span className="fw-bold">6</span>
        </p>
          </div>*/}
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}
