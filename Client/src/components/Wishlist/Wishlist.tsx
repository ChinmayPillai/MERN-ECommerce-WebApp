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
import { useContext, useReducer, createContext, useEffect } from "react";
import WishlistItem from "./WishlistItem";
import { ItemContext } from "../../App";
import { Link } from "react-router-dom";
import axios from "axios";
import { wishlistUrlBase } from "../../Util/apiUrls";

export const ForceUpdateContext = createContext<React.DispatchWithoutAction>(
  () => {}
);

export default function Wishlist() {
  console.log("render Wishlist");
  const products = useContext(ItemContext);
  if (products.user) {
    let wishlistUrl = wishlistUrlBase + products.user._id;
    useEffect(() => {
      axios.get(wishlistUrl).then((res) => {
        products.wishlistDispatch({ type: "setItems", items: res.data });
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
                <MDBCol lg="12">
                  <div className="p-5">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <MDBTypography
                        tag="h1"
                        className="fw-bold mb-0 text-black"
                      >
                        Wishlist
                      </MDBTypography>
                      <MDBTypography className="mb-0 text-muted">
                        {products.wishlist.length} items
                      </MDBTypography>
                    </div>

                    <hr className="my-8" />

                    {products.wishlist.length != 0 && (
                      <ForceUpdateContext.Provider value={forceUpdate}>
                        {products.wishlist.map((item, index) => (
                          <WishlistItem key={index + (x-x)} item={item} />
                        ))}
                      </ForceUpdateContext.Provider>
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

