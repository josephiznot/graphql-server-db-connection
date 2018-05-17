import React from "react";
import { Route, Switch, Link } from "react-router-dom";
// import Paper from "./components/Paper";
// import Ink from "./components/Ink";
import Products from "./components/Products";
import Checkout from "./components/Checkout";

export default (
  <Switch>
    <Route
      exact
      path={"/"}
      render={() => {
        return (
          <homepage>
            <h1>HOMEPAGE</h1>
          </homepage>
        );
      }}
    />
    <Route path={"/orders/:product"} component={Products} />
    <Route path={"/checkout"} component={Checkout} />
  </Switch>
);
