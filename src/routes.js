import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Paper from "./components/Paper";
import Ink from "./components/Ink";

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
    <Route
      path={"/orders"}
      render={() => {
        return (
          <div>
            <h1>ORDERS</h1>
            <Link to="/orders/ink">
              <button>Ink</button>
            </Link>
            <Link to="/orders/paper">
              <button>Paper</button>
            </Link>
            <Switch>
              <Route path="/orders/ink" component={Ink} />
              <Route path="/orders/paper" component={Paper} />
            </Switch>
          </div>
        );
      }}
    />
    <Route
      path={"./orders/:product"}
      render={() => {
        return <product />;
      }}
    />
  </Switch>
);
