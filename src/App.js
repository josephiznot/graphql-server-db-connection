import React, { Component } from "react";
import logo from "./graphqllogo.png";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import GetUsers from "./components/queries/GetUsers";
import { HashRouter, Link } from "react-router-dom";

import routes from "./routes";

const client = new ApolloClient({ uri: "http://localhost:4001/graphql" });

class App extends Component {
  render() {
    return (
      <HashRouter>
        <ApolloProvider client={client}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">GraphQL</h1>
            </header>
            <p className="App-intro">Joe's GraphQL Server</p>
            <Link to="/">
              <button>Home</button>
            </Link>
            <Link to="/orders">
              <button>Orders</button>
            </Link>
            {routes}
          </div>
        </ApolloProvider>
      </HashRouter>
    );
  }
}

export default App;
