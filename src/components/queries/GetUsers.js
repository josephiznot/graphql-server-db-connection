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
export default class GetUsers {
  render() {
    return (
      <Query query={GET_USERS}>
        {({ loading, error, data }) => {
          if (data)
            return (
              <div>
                <ul>
                  <li>{data}</li>
                </ul>
              </div>
            );
          else if (error) return <h1>Error</h1>;
          else return <h1>Loading...</h1>;
        }}
      </Query>
    );
  }
}
