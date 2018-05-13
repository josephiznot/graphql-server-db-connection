import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

export const GET_USER = ql`
query ($id: Int!){
    getUser(id: $id) {
      name
    }
  }
`;
