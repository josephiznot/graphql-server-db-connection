import React, { Component } from "react";
import axios from "axios";
export default class Paper extends Component {
  constructor() {
    super();
    this.state = {
      price: "$",
      negotiate: "100"
    };
  }
  componentDidMount() {
    axios.get(`/api/get_item/?department=product&item=paper`).then(response => {
      console.log(response);
      this.setState({ negotiate: response.data });
    });
  }
  render() {
    return (
      <div>
        <h3>
          Paper:{this.state.price}
          {this.state.negotiate}
        </h3>
        <input onChange={e => this.setState({ negotiate: e.target.value })} />
      </div>
    );
  }
}
