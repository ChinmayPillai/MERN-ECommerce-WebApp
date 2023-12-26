import { useContext } from "react";
import { ItemContext } from "../../App";
import { ForceUpdateContext } from "./Wishlist";
import {
  MDBCardImage,
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { wishlistUrlBase } from "../../Util/apiUrls";

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
let wishlistUrl = wishlistUrlBase;

function WishlistItem({ item }: Props) {
  console.log("render WishlistItem");
  const products = useContext(ItemContext);
  const forceUpdate = useContext(ForceUpdateContext);

  if (products.user) wishlistUrl = wishlistUrlBase + products.user._id;

  function removeItem() {
    console.log(`Remove ${item.id}`);
    products.wishlistDispatch({
      type: "removeItem",
      item: item,
      url: wishlistUrl,
    });
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

export default WishlistItem;
