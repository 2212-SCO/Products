const express = require('express')
const controller = require('./Controller.js')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = 3000

app.use(cors());
app.use(morgan('dev'));
app.use(express.json())

app.get('/products/:product_id', controller.getProducts)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

