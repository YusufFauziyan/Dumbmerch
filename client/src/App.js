import { useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { UserContext } from "./context/userContext";

import Auth from "./pages/Auth";
import Product from "./pages/users/Product";
import DetailProduct from "./pages/users/DetailProduct";
import Complain from "./pages/users/Complain";
import Profile from "./pages/users/Profile";
import ComplainAdmin from "./pages/admin/ComplainAdmin";
import CategoryAdmin from "./pages/admin/CategoryAdmin";
import ProductAdmin from "./pages/admin/ProductAdmin";
import UpdateCategoryAdmin from "./pages/admin/UpdateCategoryAdmin";
import AddCategoryAdmin from "./pages/admin/AddCategoryAdmin";
import AddProductAdmin from "./pages/admin/AddProductAdmin";
import UpdateProductAdmin from "./pages/admin/UpdateProductAdmin";
import PageNotFound from "./components/404/PageNotFound"

import { API } from "./config/api";

const App = () => {
  let api = API();
  let history = useHistory()
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      history.push("/auth");
    } else {
      if (state.user.status === "admin") {
        history.push("/complain-admin");
      } else if (state.user.status === "customer") {
        history.push("/");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      const response = await api.get("/check-auth", config);

      // If the token incorrect
      if (response.status === "failed") {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.user;
      // Get token from local storage
      payload.token = localStorage.token;
      
      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    checkUser();
  }, []);
  
  return (
    <Switch>
      <Route exact path="/" component={Product} />
      <Route path="/auth" component={Auth} />
      <Route path="/product/:id" component={DetailProduct} />
      <Route path="/complain" component={Complain} />
      <Route path="/profile" component={Profile} />
      <Route path="/complain-admin" component={ComplainAdmin} />
      <Route path="/category-admin" component={CategoryAdmin} />
      <Route path="/edit-category/:id" component={UpdateCategoryAdmin} />
      <Route path="/add-category" component={AddCategoryAdmin} />
      <Route path="/product-admin" component={ProductAdmin} />
      <Route path="/add-product" component={AddProductAdmin} />
      <Route path="/edit-product/:id" component={UpdateProductAdmin} />
      <Route path='/*' component={PageNotFound}/>
    </Switch>
  );
}

export default App;