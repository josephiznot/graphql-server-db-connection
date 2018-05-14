require("dotenv").config();
const express = require("express");
const app = express();
const massive = require("massive");
const { buildSchema } = require("graphql");
const bcrypt = require("bcrypt");
const {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  verifyUser
} = require("./schemaCtrl");

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
  getUser,
  getUsers,
  addUser,
  deleteUser,
  verifyUser
};
module.exports = {
  root,
  schema
};
