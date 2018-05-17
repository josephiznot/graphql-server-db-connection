const addToCart = (req, res) => {
  req.app
    .get("db")
    .add_to_cart([req.body.product, req.body.price])
    .then(after => {
      res.status(201).send();
    });
};
const negotiate = (req, res) => {
  req.app
    .get("db")
    .negotiate([req.query.product, req.body.price])
    .then(after => {
      res.status(200).send();
    });
};
const getCart = (req, res) => {
  req.app
    .get("db")
    .get_cart()
    .then(response => {
      res.status(200).send(response);
    });
};
const filterCart = (req, res) => {
  console.log(req.query);
  req.app
    .get("db")
    .filter_cart(Number(req.query.filter))
    .then(response => {
      res.status(200).send(response);
    });
};

module.exports = {
  addToCart,
  negotiate,
  getCart,
  filterCart
};
