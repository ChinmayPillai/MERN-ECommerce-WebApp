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
import { cartUrlBase, wishlistUrlBase } from "../../Util/apiUrls";

interface Props {
  item: Item;
}

let addToCartUrl = cartUrlBase;
let addToWishlistUrl = wishlistUrlBase;

export default function ProductCard({ item }: Props) {
  const cart = useContext(ItemContext);
  if (cart.user) {
    addToCartUrl = cartUrlBase + cart.user._id;
    addToWishlistUrl = wishlistUrlBase + cart.user._id;
  }

  function addToCart() {
    console.log("Adding to Cart");
    if (!cart.user) {
      location.href = "/login";
      return;
    }

    const inc = new Promise<string>((resolve, reject) => {
      if (cart.items.length == 0) reject();
      cart.items.map((cartItem, index, arr) => {
        if (cartItem.id === item.id) {
          console.log("Calling Dispatch increment");
          cart.dispatch({ type: "increment", item: item, url: addToCartUrl });
          resolve("Increment");
        }
        if (index + 1 === arr.length) reject();
      });
    });

    inc.then(() => alert("Incresed Quantity in Cart"));

    inc.catch(() => {
      console.log("Calling Dispatch addItem");
      cart.dispatch({ type: "addItem", item: item, url: addToCartUrl });
      alert("Added to Cart");
      return;
    });
  }

  function addToWishlist() {
    console.log("Adding to Wishlist");
    if (!cart.user) {
      location.href = "/login";
      return;
    }

    const inc = new Promise<string>((resolve, reject) => {
      if (cart.wishlist.length == 0) reject();
      cart.wishlist.map((cartItem, index, arr) => {
        if (cartItem.id === item.id) {
          resolve("Increment");
        }
        if (index + 1 === arr.length) reject();
      });
    });

    inc.then(() => alert("Already in Wishlist"));

    inc.catch(() => {
      console.log("Calling Wishlist Dispatch addItem");
      cart.wishlistDispatch({
        type: "addItem",
        item: item,
        url: addToWishlistUrl,
      });
      alert("Added to Wishlist");
      return;
    });
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
          </div>

          <div className="d-flex justify-content-between mb-3">
            <h5 className="mb-0">{item.name}</h5>
            <h5 className="text-dark mb-0">$ {item.price}</h5>
          </div>
          <div className="d-flex flex-row">
            <MDBBtn
              color="primary"
              rippleColor="dark"
              className="flex-fill ms-1"
              onClick={addToWishlist}
            >
              Wishlist
            </MDBBtn>
            <MDBBtn
              color="danger"
              className="flex-fill ms-2"
              onClick={addToCart}
            >
              Add to Cart
            </MDBBtn>
          </div>

          <div className="d-flex justify-content-between mb-2">
            {/* <p className="text-muted mb-0">
              Available: <span className="fw-bold">6</span>
        </p> */}
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}
