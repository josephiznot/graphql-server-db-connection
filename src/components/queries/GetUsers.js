import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

export const GET_USERS = gql`
  query {
    getUsers {
      name
    }
  }
`;
