const PostGres = require("./db.js");
const pool = require("./db.js");

//products
//features
//styles
//skus
//related
//photos
module.exports = {
  getProducts: ({ page = 0, count = 5 }, callback) => {
    let params = [(page = count * page), (count = count)];
    pool
      .query("SELECT * from products LIMIT $2 OFFSET $1", params)
      .then((res) => {
        callback(null, res.rows);
      })
      .catch((err) => {
        callback(err, null);
      });
  },
  getProductsbyID: (id, callback) => {
    let params = [id];
    pool
      .query(
        "SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, json_agg(json_build_object('feature', f.feature, 'value', f.value)) as features FROM products p, features f where p.id = $1 and f.product_id = p.id group by p.id",
        params
      )
      .then((res) => {
        console.log(res.rows);
        callback(null, res.rows);
      })
      .catch((err) => {
        callback(err, null);
      });
  },

  //"SELECT s.product_id, json_agg(json_build_object('style_id', s.id, 'name', s.name, 'original_price', s.original_price, 'sale_price', s.sale_price, 'default?', s.default_style, 'photos', array_agg(json_build_object('thumbnail_url', p.thumbnail_url, 'url', p.url)))) as results from styles s, photos p where s.product_id = $1 and p.style_id = s.id group by s.product_id, p.style_id"

  //json_agg(jsonb_object_agg('thumbnail_url', p.thumbnail_url, 'url', p.url))
  //FROM photos //WHERE p.style_id=s.id

  //jsonb_agg(sku.id ,json_build_object('quantity', sku.quantity, 'size', sku.size))
  //FROM skus //WHERE skus.style_id = s.id

  //distinct JSONB_build_object
  //Cast syntax
  //postgresql-coalesce

  //select, colalesce, cast, join

  //(json.agg(select photos.thumbnail_url, photos.url from photos where photos.style_id = s.id))

  //(json_build_object(select * from skus where skus.style_id = s.id))

  // "json_build_object('product_id', s.product_id, json_agg(json_build_object('style_id', s.id, 'name', s.name, 'original_price', s.original_price, 'sale_price', s.sale_price, 'default?', s.default_style, 'photos', (json_agg(json_build_object('thumbnail_url', p.thumbnail_url, 'url', p.url)), 'skus', )) as results from styles s, photos p, skus where s.product_id = $1 and p.style_id = s.id and skus.style_id = s.id group by s.product_id",

  //(Select jsonb_object_agg(quantity, size) from (values ('quantity', sku.quantity),('size', sku.size))

  getStylesbyID: (id, callback) => {
    let params = [id];
    let queryString = `SELECT json_build_object(
      'product_id', s.product_id::text,
      'results', (
          coalesce(array_agg(
              json_build_object(
                  'style_id', s.id,
                  'name', s.name,
                  'original_price', s.original_price,
                  'sale_price', s.sale_price,
                  'default?', s.default_style,
                  'photos', (
                      SELECT json_agg(
                          json_build_object(
                              'thumbnail_url', p.thumbnail_url,
                              'url', p.url
                          )
                      )
                      FROM photos p
                      WHERE p.style_id = s.id
                  ),
                  'skus', (
                      SELECT json_object_agg(
                          skus.id,
                          json_build_object(
                              'quantity', skus.quantity,
                              'size', skus.size
                          )
                      )
                      FROM skus
                      WHERE skus.style_id = s.id
                  )
              )
          )
          , array[]::json[])
      )
    )
    as data
    FROM styles s
    WHERE s.product_id = $1
    GROUP BY s.product_id;`;
    pool
      .query(queryString, params)
      .then((res) => {
        console.log(res.rows);
        callback(null, res.rows[0].data);
      })
      .catch((err) => {
        console.log(err);
        callback(err, null);
      });
  },
  getRelatedbyID: (id, callback) => {
    let params = [id];
    pool
      .query(
        "select (array_agg(r.related_product_id)) from related r where current_product_id = $1 group by r.current_product_id",
        params
      )
      .then((res) => {
        console.log(res);
        callback(null, res.rows[0].array_agg);
      })
      .catch((err) => {
        callback(err, null);
      });
  },
};
// app.get("/products/:product_id", controller.getProductsbyID);
//app.get("/products/:product_id/styles", controller.getStylesbyID);
// app.get("/products/:product_id/related", controller.getRelatedbyID);

//loader.io
//load balancing, stress testing
