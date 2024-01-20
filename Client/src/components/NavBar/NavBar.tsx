import { Outlet } from "react-router-dom";
import { Item, NavItem } from "./NavItem";
import { useContext } from "react";
import { ItemContext } from "../../App";

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

const Wishlist: Item = {
  name: "Wishlist",
  link: "/wishlist",
  internal: true,
  img: "Wishlist.png",
  margin: "me-2",
};

let Login: Item = {
  name: "Login / SignUp",
  link: "/login",
  internal: true,
  img: "Login.png",
  margin: "me-2",
};

function NavBar() {
  const products = useContext(ItemContext);
  if (products.user) {
    Login.name = products.user.name;
    Login.link = "/orders"
  }

  function Logout() {
    localStorage.removeItem("token");
    location.href = "/";
  }

  return (
    <>
      <nav
        className="navbar sticky-top bg-dark navbar-expand-lg"
        data-bs-theme="dark"
      >
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
              <NavItem item={Home} />
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
              <NavItem key={1} item={Wishlist} />
              <NavItem key={2} item={Cart} />
              <NavItem key={3} item={Login} />
              <li className="nav-item my-2">
                <img
                  src="Logout.png"
                  alt="Logout"
                  width="30"
                  height="24"
                  onClick={Logout}
                ></img>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default NavBar;
