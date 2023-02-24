const model = require("./Model.js");

let cache = {
  styles: {},
  products: {},
  related: {},
};

const controller = {
  getProducts: (req, res) => {
    let params = req.query;
    model.getProducts(params, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },
  getProductsbyID: (req, res) => {
    let id = req.params.product_id;
    if (cache.products[id]) {
      res.status(200).send(cache.products[id]);
    } else {
      model.getProductsbyID(id, (err, data) => {
        if (err) {
          res.status(400).send(err);
        } else {
          cache.products[id] = { data };
          res.status(200).send(data);
        }
      });
    }
  },
  getStylesbyID: (req, res) => {
    let id = req.params.product_id;
    if (cache.styles[id]) {
      res.status(200).send(cache.styles[id]);
    } else {
      model.getStylesbyID(id, (err, data) => {
        if (err) {
          res.status(400).send(err);
        } else {
          cache.styles[id] = { data };
          res.status(200).send(data);
        }
      });
    }
  },
  getRelatedbyID: (req, res) => {
    let id = req.params.product_id;
    if (cache.related[id]) {
      res.status(200).send(cache.related[id]);
    } else {
      model.getRelatedbyID(id, (err, data) => {
        if (err) {
          res.status(400).send(err);
        } else {
          cache.related[id] = { data };
          res.status(200).send(data);
        }
      });
    }
  },
};

module.exports = controller;
