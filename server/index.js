require("dotenv").config();
const express = require("express");
const app = express();
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const graphqlHTTP = require("express-graphql");

const { schema, root } = require(`${__dirname}/graphql/schema`);

const port = 4001;

app.use(json());
app.use(cors());

massive(process.env.DATABASE_KEY).then(db => {
  app.set("db", db);
});

app.get("/api/get_item", (req, res) => {
  let { department, item } = req.query;
  console.log(department, item);
  req.app
    .get("db")
    .get_stuff([department, item])
    .then(response => {
      res.status(200).send(response);
    });
});

app.use("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: true }));
app.post("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: false }));

app.listen(port, () => {
  console.log(`Graphql server on port: ${port}`);
});
