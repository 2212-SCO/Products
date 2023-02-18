const model = require('./Model.js')

const controller = {
  getProducts: (req, res) => {
    let id = req.params.product_id
    console.log(id)
    model.getProductsbyID(id, (err, data) =>{
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(data)
      }
    })

  }
}

module.exports = controller