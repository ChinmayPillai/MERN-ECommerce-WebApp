// import { useContext } from "react";
// import { ItemContext } from "../../App";
// import { ForceUpdateContext } from "./Orders";
import { MDBCardImage, MDBCol, MDBRow, MDBTypography } from "mdb-react-ui-kit";
// import { orderUrlBase } from "../../Util/apiUrls";

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
// let orderUrl = orderUrlBase;

function OrderItem({ item }: Props) {
  console.log("render OrderItem");
  // const products = useContext(ItemContext);
  // const forceUpdate = useContext(ForceUpdateContext);

  // if (products.user) orderUrl = orderUrlBase + products.user._id;

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
          <MDBTypography tag="h6" className="mb-0">
            x{item.quantity}
          </MDBTypography>
        </MDBCol>
      </MDBRow>

      <hr className="my-4" />
    </>
  );
}

export default OrderItem;
