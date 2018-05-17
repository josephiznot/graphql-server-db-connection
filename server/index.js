require("dotenv").config();
const express = require("express");
const app = express();
const { json } = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const graphqlHTTP = require("express-graphql");

const { schema, root } = require(`${__dirname}/graphql/schema`);
const {
  addToCart,
  negotiate,
  getCart,
  filterCart
} = require("./controllers/cartCtrl");

const port = 4001;

app.use(json());
app.use(cors());

massive(process.env.DATABASE_KEY).then(db => {
  app.set("db", db);
});

//--------------------------competetetenciesssss-------------
app.post("/api/add_to_cart", addToCart);
app.put("/api/negotiate", negotiate);
app.get("/api/get_cart", getCart);
app.get("/api/filter_cart", filterCart);
//-----------------------------------------------------

app.use("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: true }));
app.post("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: false }));

app.listen(port, () => {
  console.log(`Graphql server on port: ${port}`);
});
