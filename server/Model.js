const PostGres = require('./db.js')
const pool = require('./db.js')

module.exports= {
  getProductsbyID : (id, callback) => {
  console.log(id)
  let params = [id]
  console.log(params)
  pool.query('select * from products where id = $1', params)
  .then((res)=>{ callback(null, res)})
  .catch((err) =>{callback(err, null)})
  }
}

//loader.io
//load balancing, stress testing