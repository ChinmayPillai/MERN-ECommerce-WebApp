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

interface Props {
  item: Item;
}

export default function ProductCard({ item }: Props) {
  const cart = useContext(ItemContext);

  const stars = [];
  if (item.rating) {
    for (let i = 0; i < item.rating; i++) {
      stars.push(<MDBIcon fas icon="star" />);
    }
    for (let i = item.rating; i < 5; i++) {
      stars.push(<MDBIcon far icon="star" />);
    }
  }

  function addToCart() {
    cart.items.map((cartItem) => {
      if (cartItem === item) {
        cart.dispatch({ type: "increment", item: item });
        return;
      }
    });
    cart.dispatch({ type: "addItem", item: item });
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
