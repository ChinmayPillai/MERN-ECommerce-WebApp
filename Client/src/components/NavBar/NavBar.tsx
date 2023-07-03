import { Outlet } from "react-router-dom";
import { Item, NavItem } from "./Item";

const Home: Item = {
  name: "Home",
  link: "/#",
  internal: true,
};

const Cart: Item = {
  name: "Cart",
  link: "/cart",
  internal: true,
  img: "Cart.png",
  margin: "me-2",
};

const Login: Item = {
  name: "Login / SignUp",
  link: "/login",
  internal: true,
  img: "Login.png",
  margin: "me-2",
};

function NavBar() {
  return (
    <>
      <nav
        className="navbar sticky-top bg-dark navbar-expand-lg"
        data-bs-theme="dark"
      >
        {/*<nav className="navbar bg-primary navbar-expand-lg bg-body-tertiary">*/}
        <div className="container-fluid">
          <a className="navbar-brand" href="/#">
            ECom
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/*<li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/#">
                  Home
                </a>
              </li>*/}
              <NavItem item={Home} />
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
              <NavItem item={Cart} />
              <NavItem item={Login} />
            </ul>
            {/*<form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>*/}
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default NavBar;
