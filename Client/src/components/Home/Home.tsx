import Products from "./Products";
import { ItemContext } from "../../App";
import { useEffect, useContext } from "react";
import * as jose from "jose";
import axios from "axios";
import { userURL } from "../../Util/apiUrls";

export default function Home() {
  const context = useContext(ItemContext);
  function setUser() {
    axios
      .get(userURL, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        if (!res.data.error) context.setUser(res.data);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jose.decodeJwt(token);
      if (!user) localStorage.removeItem("token");
      else setUser();
    }
  }, []);

  return <Products />;
}
