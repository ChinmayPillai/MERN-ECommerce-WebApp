import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import {
  useState,
  useContext,
  useReducer,
  createContext,
  useEffect,
} from "react";
import WishlistItem from "./WishlistItem";
import { ItemContext } from "../../App";
import { Link } from "react-router-dom";
import axios from "axios";

export const ForceUpdateContext = createContext<React.DispatchWithoutAction>(
  () => {}
);

const cartUrlBase = "http://localhost:3000/cart/";

export default function Wishlist() {
  console.log("render Cart");
  const cart = useContext(ItemContext);
  if (cart.user) {
    let cartUrl = cartUrlBase + cart.user._id;
    useEffect(() => {
      axios.get(cartUrl).then((res) => {
        cart.dispatch({ type: "setItems", items: res.data });
      });
    }, []);
  }

  const [x, forceUpdate] = useReducer((x) => x + 1, 0);

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol size="12">
            <MDBCard
              className="card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <MDBCardBody className="p-0">
                {/* <MDBRow className="g-0"> */}
                <MDBCol lg="8">
                  <div className="p-5">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <MDBTypography
                        tag="h1"
                        className="fw-bold mb-0 text-black"
                      >
                        Wishlist
                      </MDBTypography>
                      <MDBTypography className="mb-0 text-muted">
                        {cart.items.length} items
                      </MDBTypography>
                    </div>

                    <hr className="my-8" />

                    {cart.items.length != 0 && (
                      <ForceUpdateContext.Provider value={forceUpdate}>
                        {cart.items.map((item, index) => (
                          <WishlistItem key={index} item={item} />
                        ))}
                      </ForceUpdateContext.Provider>
                    )}

                    <div className="pt-5">
                      <MDBTypography tag="h6" className="mb-0">
                        <MDBCardText tag="a" href="#!" className="text-body">
                          <MDBIcon fas icon="long-arrow-alt-left me-2" />
                          <Link to="/">Back to shop</Link>
                        </MDBCardText>
                      </MDBTypography>
                    </div>
                  </div>
                </MDBCol>
                {/*
                  <MDBCol lg="4" className="bg-grey">
                    <div className="p-5">
                      <MDBTypography
                        tag="h3"
                        className="fw-bold mb-5 mt-2 pt-1"
                      >
                        Summary
                      </MDBTypography>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4">
                        <MDBTypography tag="h5" className="text-uppercase">
                          {cart.items.length} items
                        </MDBTypography>
                        <MDBTypography tag="h5">$ {cost}</MDBTypography>
                      </div>

                      <MDBTypography tag="h5" className="mb-3">
                        Shipping
                      </MDBTypography>

                      <div className="mb-4 pb-2">
                        <select
                          className="select p-2 rounded bg-grey"
                          style={{ width: "100%" }}
                          value={delivery}
                          onChange={handleDelivery}
                        >
                          <option value="0">Standard Delivery - Free</option>
                          <option value="5">One-Day Delivery - $5</option>
                          <option value="10">Delivery Today - $10</option>
                          <option value="20">Deliven in 1hr - $20</option>
                        </select>
                      </div>

                      <MDBTypography tag="h5" className="mb-3">
                        Referal Code
                      </MDBTypography>

                      <div className="mb-5">
                        <MDBInput size="lg" label="Enter your code" />
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Total price
                        </MDBTypography>
                        <MDBTypography tag="h5">
                          $ {cost + delivery}
                        </MDBTypography>
                      </div>

                      <MDBBtn color="dark" block size="lg">
                        Checkout
                      </MDBBtn>
                    </div>
                        </MDBCol>*/}
                {/* </MDBRow> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
