import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const ADD_USER = gql`
  mutation(
    $userName: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: Int!
    $password: String!
  ) {
    addUser(
      userName: $userName
      email: $email
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
      password: $password
    ) {
      name
    }
  }
`;
