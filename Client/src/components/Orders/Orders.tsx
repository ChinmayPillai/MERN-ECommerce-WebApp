import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useContext, createContext, useEffect } from "react";
import OrderItem from "./OrderItem";
import { ItemContext } from "../../App";
import { Link } from "react-router-dom";
import axios from "axios";
import { orderUrlBase } from "../../Util/apiUrls";

export const ForceUpdateContext = createContext<React.DispatchWithoutAction>(
  () => {}
);

export default function Orders() {
  console.log("render Orders");
  const products = useContext(ItemContext);

  if (products.user) {
    let orderUrl = orderUrlBase + products.user._id;
    useEffect(() => {
      axios.get(orderUrl).then((res) => {
        products.ordersDispatch({ type: "setItems", items: res.data });
      });
      console.log("Setting Items");
    }, []);
  }

  // const [x, forceUpdate] = useReducer((x) => x + 1, 0);

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
                <MDBCol lg="12">
                  <div className="p-5">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <MDBTypography
                        tag="h1"
                        className="fw-bold mb-0 text-black"
                      >
                        Orders
                      </MDBTypography>
                      <MDBTypography className="mb-0 text-muted">
                        {products.orders.length} items
                      </MDBTypography>
                    </div>

                    <hr className="my-8" />

                    {products.orders.length != 0 && (
                        <div>
                          {products.orders.map((item, index) => (
                            <OrderItem key={index} item={item} />
                          ))}
                        </div>
                    )}

                    <div className="pt-5">
                      <MDBTypography tag="h6" className="mb-0">
                        <MDBCardText className="text-body">
                          <MDBIcon fas icon="long-arrow-alt-left me-2" />
                          <Link to="/">Back to shop</Link>
                        </MDBCardText>
                      </MDBTypography>
                    </div>
                  </div>
                </MDBCol>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
