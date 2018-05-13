import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const DELETE_USER = gql`
  mutation($id: Int!) {
    deleteUser(id: $id) {
      name
    }
  }
`;
