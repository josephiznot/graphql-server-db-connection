require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const { buildSchema } = require("graphql");

class User {
  constructor({
    user_id,
    user_name,
    user_email,
    first_name,
    last_name,
    phone_number
  }) {
    this.id = user_id;
    this.name = user_name;
    this.email = user_email;
    this.firstName = first_name;
    this.lastName = last_name;
    this.phoneNumber = phone_number;
    // this.user_password = user_password;
  }
  getData(data) {
    return data.map(getData);
  }
}

const schema = buildSchema(
  `
    type User{
        id: ID!
        name: String!
        email: String!
        firstName: String!
        lastName: String!
        phoneNumber: String!
    },
    type Query {
        users: [User]!
        user(id: Int!): User!
    },
    `
);
const root = {
  users(_, req) {
    return req.app
      .get("db")
      .get_users()
      .then(response => {
        return response.map(val => {
          return new User(val);
        });
      });
  }
};
module.exports = {
  root,
  schema
};
