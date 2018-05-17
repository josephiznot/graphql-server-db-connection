import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-redux";
import axios from "axios";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      cart: []
    };
    this.filter = this.filter.bind(this);
  }
  componentDidMount() {
    axios.get("/api/get_cart").then(response => {
      console.log(response);
      this.setState({ cart: response.data });
    });
  }
  filter() {
    axios.get("/api/filter_cart/?filter=1").then(response => {
      console.log(response);
      this.setState({ cart: response.data });
    });
  }
  render() {
    const mapped = this.state.cart.map((e, i) => {
      return (
        <div key={i}>
          <h2>{e.product_name}</h2>
          <h6>{e.product_price}</h6>
        </div>
      );
    });
    return (
      <div>
        <header>Checkout</header>
        {mapped}
        <button onClick={this.filter}>Filter by price</button>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(Checkout);
