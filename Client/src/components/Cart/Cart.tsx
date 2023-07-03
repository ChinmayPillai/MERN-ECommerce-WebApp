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
import { useState, useContext, useReducer, createContext } from "react";
import CartItem from "./CartItem";
import { ItemContext } from "../../App";

export const ForceUpdateContext = createContext<React.DispatchWithoutAction>(
  () => {}
);

export default function Cart() {
  console.log("render Cart");

  const [x, forceUpdate] = useReducer((x) => x + 1, 0);

  const products = useContext(ItemContext);
  let cost = 0;
  products.items.map((item) => {
    cost += item.price * item.quantity;
  });

  {
    /*const [cost, setCost] = useState(tempCost);*/
  }
  const [delivery, setDelivery] = useState(0);
  //const [totalPrice, setTotalPrice] = useState(cost);

  function handleDelivery(e: React.ChangeEvent<HTMLSelectElement>) {
    setDelivery(Number(e.target.value));
    //setTotalPrice(cost + Number(e.target.value));
  }

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
                <MDBRow className="g-0">
                  <MDBCol lg="8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <MDBTypography
                          tag="h1"
                          className="fw-bold mb-0 text-black"
                        >
                          Shopping Cart
                        </MDBTypography>
                        <MDBTypography className="mb-0 text-muted">
                          {products.items.length} items
                        </MDBTypography>
                      </div>

                      <hr className="my-4" />

                      <ForceUpdateContext.Provider value={forceUpdate}>
                        {products.items.map((item, index) => (
                          <CartItem key={index} item={item} />
                        ))}
                      </ForceUpdateContext.Provider>

                      <div className="pt-5">
                        <MDBTypography tag="h6" className="mb-0">
                          <MDBCardText tag="a" href="#!" className="text-body">
                            <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                            to shop
                          </MDBCardText>
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>
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
                          {products.items.length} items
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
                        Register
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
