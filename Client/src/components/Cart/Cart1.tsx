function Cart() {
  return (
    <>
      <section className="section-pagetop bg">
        <div className="container">
          <h2 className="title-page">Shopping cart</h2>
        </div>
      </section>

      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <main className="col-md-9">
              <div className="card">
                <table className="table table-borderless table-shopping-cart">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" style={{ width: "120" }}>
                        Quantity
                      </th>
                      <th scope="col" style={{ width: "120" }}>
                        Price
                      </th>
                      <th
                        scope="col"
                        className="text-right"
                        style={{ width: "200" }}
                      >
                        {" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <figure className="itemside">
                          <div className="aside">
                            <img
                              src="assets/images/items/1.jpg"
                              className="img-sm"
                            />
                          </div>
                          <figcaption className="info">
                            <a href="#" className="title text-dark">
                              Some name of item goes here nice
                            </a>
                            <p className="text-muted small">
                              Size: XL, Color: blue, <br /> Brand: Gucci
                            </p>
                          </figcaption>
                        </figure>
                      </td>
                      <td>
                        <select className="form-control">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </select>
                      </td>
                      <td>
                        <div className="price-wrap">
                          <var className="price">$1156.00</var>
                          <small className="text-muted"> $315.20 each </small>
                        </div>
                      </td>
                      <td className="text-right">
                        <a
                          data-original-title="Save to Wishlist"
                          title=""
                          href=""
                          className="btn btn-light mr-2"
                          data-toggle="tooltip"
                        >
                          {" "}
                          <i className="fa fa-heart"></i>
                        </a>
                        <a href="" className="btn btn-light">
                          {" "}
                          Remove
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <figure className="itemside">
                          <div className="aside">
                            <img
                              src="assets/images/items/2.jpg"
                              className="img-sm"
                            />
                          </div>
                          <figcaption className="info">
                            <a href="#" className="title text-dark">
                              Product name goes here nice
                            </a>
                            <p className="text-muted small">
                              Size: XL, Color: blue, <br /> Brand: Gucci
                            </p>
                          </figcaption>
                        </figure>
                      </td>
                      <td>
                        <select className="form-control">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </select>
                      </td>
                      <td>
                        <div className="price-wrap">
                          <var className="price">$149.97</var>
                          <small className="text-muted"> $75.00 each </small>
                        </div>
                      </td>
                      <td className="text-right">
                        <a
                          data-original-title="Save to Wishlist"
                          title=""
                          href=""
                          className="btn btn-light mr-2"
                          data-toggle="tooltip"
                        >
                          {" "}
                          <i className="fa fa-heart"></i>
                        </a>
                        <a href="" className="btn btn-light btn-round">
                          {" "}
                          Remove
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <figure className="itemside">
                          <div className="aside">
                            <img
                              src="assets/images/items/3.jpg"
                              className="img-sm"
                            />
                          </div>
                          <figcaption className="info">
                            <a href="#" className="title text-dark">
                              Another name of some product goes just here
                            </a>
                            <p className="small text-muted">
                              Size: XL, Color: blue, Brand: Tissot
                            </p>
                          </figcaption>
                        </figure>
                      </td>
                      <td>
                        <select className="form-control">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>
                      </td>
                      <td>
                        <div className="price-wrap">
                          <var className="price">$98.00</var>
                          <small className="text-muted"> $578.00 each</small>
                        </div>
                      </td>
                      <td className="text-right">
                        <a
                          data-original-title="Save to Wishlist"
                          title=""
                          href=""
                          className="btn btn-light mr-2"
                          data-toggle="tooltip"
                        >
                          {" "}
                          <i className="fa fa-heart"></i>
                        </a>
                        <a href="" className="btn btn-light btn-round">
                          {" "}
                          Remove
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="card-body border-top">
                  <a href="#" className="btn btn-primary float-md-right">
                    {" "}
                    Make Purchase <i className="fa fa-chevron-right"></i>{" "}
                  </a>
                  <a href="#" className="btn btn-light">
                    {" "}
                    <i className="fa fa-chevron-left"></i> Continue shopping{" "}
                  </a>
                </div>
              </div>

              <div className="alert alert-success mt-3">
                <p className="icontext">
                  <i className="icon text-success fa fa-truck"></i> Free
                  Delivery within 1-2 weeks
                </p>
              </div>
            </main>
            <aside className="col-md-3">
              <div className="card mb-3">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>Have coupon?</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          name=""
                          placeholder="Coupon code"
                        />
                        <span className="input-group-append">
                          <button className="btn btn-primary">Apply</button>
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  <dl className="dlist-align">
                    <dt>Total price:</dt>
                    <dd className="text-right">USD 568</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Discount:</dt>
                    <dd className="text-right">USD 658</dd>
                  </dl>
                  <dl className="dlist-align">
                    <dt>Total:</dt>
                    <dd className="text-right  h5">
                      <strong>$1,650</strong>
                    </dd>
                  </dl>
                  <hr />
                  <p className="text-center mb-3">
                    <img src="assets/images/misc/payments.png" height="26" />
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-name bg padding-y">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>

      <footer className="section-footer border-top padding-y">
        <div className="container">
          <p className="float-md-right">
            &copy; Copyright 2020 All rights reserved
          </p>
          <p>
            <a href="#">Terms and conditions</a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default Cart;
