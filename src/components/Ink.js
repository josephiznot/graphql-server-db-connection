import React, { Component } from "react";
import axios from "axios";

export default class Ink extends Component {
  constructor() {
    super();
    this.state = {
      price: "$",
      negotiate: "100"
    };
  }
  componentDidMount() {
    axios.get(`/api/get_item/?department=product&item=ink`).then(response => {
      console.log(response);
      this.setState({ negotiate: response.data });
    });
  }
  render() {
    console.log(this.state.negotiate);
    return (
      <div>
        <h3>
          Ink:{this.state.price}
          {this.state.negotiate}
        </h3>
        <input onChange={e => this.setState({ negotiate: e.target.value })} />
        <button onClick={() => axios.put("/api/negotiate")}>Negotiate</button>
      </div>
    );
  }
}
