import { useContext } from "react";
import { ItemContext } from "../../App";
import { ForceUpdateContext } from "./Cart";
import {
  MDBBtn,
  MDBCardImage,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { cartUrlBase } from "../../Util/apiUrls";

export type Item = {
  id: number;
  name: string;
  type: string;
  img?: string;
  price: number;
  quantity: number;
  rating?: number;
};

interface Props {
  item: Item;
}
let cartUrl = cartUrlBase;

function CartItem({ item }: Props) {
  console.log("render CartItem");
  const products = useContext(ItemContext);
  const forceUpdate = useContext(ForceUpdateContext);

  if (products.user) cartUrl = cartUrlBase + products.user._id;

  function incrementQuantity() {
    products.dispatch({ type: "increment", item: item, url: cartUrl });
    console.log("Increment");
    forceUpdate();
    //setQuantity((c) => c + 1);
  }

  function decrementQuantity() {
    products.dispatch({ type: "decrement", item: item, url: cartUrl });
    console.log("Decrement");
    forceUpdate();
    //setQuantity((c) => c - 1);
  }

  function removeItem() {
    console.log(`Remove ${item.id}`);
    products.dispatch({ type: "removeItem", item: item, url: cartUrl });
    forceUpdate();
  }

  return (
    <>
      <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
        <MDBCol md="2" lg="2" xl="2">
          <MDBCardImage
            src={item.img}
            fluid
            className="rounded-3"
            alt={item.name}
          />
        </MDBCol>
        <MDBCol md="3" lg="3" xl="3">
          <MDBTypography tag="h6" className="text-muted">
            {item.type}
          </MDBTypography>
          <MDBTypography tag="h6" className="text-black mb-0">
            {item.name}
          </MDBTypography>
        </MDBCol>
        <MDBCol md="3" lg="3" xl="3" className="d-flex align-items-center">
          <MDBBtn color="link" className="px-2" onClick={decrementQuantity}>
            <MDBIcon fas icon="minus" />
          </MDBBtn>

          <MDBInput type="number" min="0" value={item.quantity} size="sm" />

          <MDBBtn color="link" className="px-2" onClick={incrementQuantity}>
            <MDBIcon fas icon="plus" />
          </MDBBtn>
        </MDBCol>
        <MDBCol md="3" lg="2" xl="2" className="text-end">
          <MDBTypography tag="h6" className="mb-0">
            $ {item.price}
          </MDBTypography>
        </MDBCol>
        <MDBCol md="1" lg="1" xl="1" className="text-end">
          <a href="#!" className="text-muted" onClick={removeItem}>
            <MDBIcon fas icon="times" />
          </a>
        </MDBCol>
      </MDBRow>

      <hr className="my-4" />
    </>
  );
}

export default CartItem;
