// const {pg} = require('pg')
const { Pool } = require('pg')

const pool = new Pool({
  host: "localhost",
  user: "William",
  port: 5432,
  database: "sdcproducts",
});

// pool.connect((err) => {
//   if (err) {
//     console.error('connection error', err.stack)
//   } else {
//     console.log('connected')
//   }
// })

module.exports = pool;

