import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Signin from "./user/Signin";
import Signup from "./user/Signup";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />

        <PrivateRoute path="/test" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;