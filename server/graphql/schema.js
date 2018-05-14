require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const { buildSchema } = require("graphql");
const bcrypt = require("bcrypt");

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
        getUsers: [User]!
        getUser(id: Int!): User!
        verifyUser(email: String, userName: String, password: String!): User!
    },
    type Mutation{
      deleteUser(id: Int!): User!
      addUser(userName: String!, email: String!, firstName: String!, lastName: String!, phoneNumber: Int!, password: String!): User!
    }
    input ReviewInput{
      worksHard: Boolean!
      concerns: String
    }
   
    `
);
const root = {
  getUsers(_, req) {
    return req.app
      .get("db")
      .get_users()
      .then(response => {
        return response.map(val => {
          return new User(val);
        });
      });
  },
  getUser({ id }, req) {
    return req.app
      .get("db")
      .get_users()
      .then(response => {
        const filtered = response.filter(user => {
          return user.user_id === id;
        });
        return new User(filtered[0]);
      });
  },
  deleteUser({ id }, req) {
    return req.app
      .get("db")
      .delete_user(id)
      .then(response => {
        return new User(response[0]);
      });
  },
  addUser(
    { userName, email, firstName, lastName, phoneNumber, password },
    req
  ) {
    return req.app
      .get("db")
      .add_user([userName, email, firstName, lastName, phoneNumber])
      .then(response => {
        /*
          DUE TO BLOCK SCOPE, I CANNOT ADD THE HASH PASSWORD
          TO THE USER AND SEND BACK THE USER TO THE CLIENT.
          I MUST ADD THE CREDENTIALS AND THEN UPDATE THE USER
          WITH A HASHED PASSWORD.
        */
        bcrypt.hash(password, 10, (err, hash) => {
          req.app.get("db").update_password([hash, response[0].user_id]);
        });
        return new User(response[0]);
      });
  },
  verifyUser({ email, password, userName }, req) {
    return req.app
      .get("db")
      .get_users()
      .then(response => {
        const filtered = response.filter(e => {
          return e.user_email === email || e.user_name === userName;
        });
        if (!filtered[0]) {
          throw new Error("incorrect email or username");
        } else {
          return filtered[0];
        }
      })
      .then(credentials => {
        if (bcrypt.compareSync(password, credentials.user_password)) {
          return new User(credentials);
        } else {
          throw new Error("password incorrect");
        }
      });
  }
};
module.exports = {
  root,
  schema
};
