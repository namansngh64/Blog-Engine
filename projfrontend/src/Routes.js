import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import CreateBlog from "./blog/CreateBlog";
import EditBlog from "./blog/EditBlog";
import ManageBlogs from "./blog/ManageBlogs";
import ViewBlog from "./blog/ViewBlog";
import Home from "./core/Home";
import NoPage from "./core/NoPage";
import Signin from "./user/Signin";
import Signup from "./user/Signup";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/blog/:blogId" exact component={ViewBlog} />
        <PrivateRoute path="/test" exact component={Signup} />
        <PrivateRoute path="/create/blog" exact component={CreateBlog} />
        <PrivateRoute path="/manage" exact component={ManageBlogs} />
        <PrivateRoute path="/edit/blog/:blogId" exact component={EditBlog} />

        {/* 404 page message */}
        <Route path="*" exact={true} component={NoPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
