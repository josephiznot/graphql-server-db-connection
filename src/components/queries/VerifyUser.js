import React, { Component } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

export const VERIFY_USER = gql`
  query($email: String, $userName: String, $password: String!) {
    verifyUser(email: $email, userName: $userName, password: $password) {
      name
    }
  }
`;
