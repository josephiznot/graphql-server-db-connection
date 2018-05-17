import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class Products extends Component {
  constructor() {
    super();
    this.state = { negotiate: 0 };
    this.addToCart = this.addToCart.bind(this);
  }
  addToCart() {
    alert("added to cart");
    axios.post("/api/add_to_cart", {
      product: this.props.match.params.product,
      price: this.props[this.props.match.params.product]
    });
  }
  negotiate(val) {
    isNaN(val),
      this.setState({ negotiate: 0 }) || this.setState({ negotiate: val });
  }
  sendNegotiation(price) {
    axios.put(`/api/negotiate/?product=${this.props.match.params.product}`, {
      price: price
    });
  }
  render() {
    console.log(this.state.negotiate);
    return (
      <div>
        <h3>
          {this.props.match.params.product}:${
            this.props[this.props.match.params.product]
          }
        </h3>
        <button onClick={this.addToCart}>add to cart</button>
        <br />
        <input
          value={this.state.negotiate}
          onChange={e => this.negotiate(e.target.value)}
        />
        <button onClick={() => this.sendNegotiation(this.state.negotiate)}>
          Negotiate price
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => state;
export default connect(mapStateToProps)(Products);
