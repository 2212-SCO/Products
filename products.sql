Create database sdcproducts;
\c sdcproducts;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'products'
--
-- ---

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  id Serial,
  name VARCHAR(255) NULL,
  slogan VARCHAR(255) NULL,
  description VARCHAR(255) NULL,
  category VARCHAR(255) NULL,
  default_price VARCHAR(255) NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'skus'
--
-- ---

DROP TABLE IF EXISTS skus;

CREATE TABLE skus (
  id INTEGER NULL DEFAULT NULL,
  style_id INTEGER NULL DEFAULT NULL,
  quantity INTEGER NULL,
  size VARCHAR(255) NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'styles'
--
-- ---

DROP TABLE IF EXISTS styles;

CREATE TABLE styles (
  id serial,
  product_id INTEGER NULL,
  name VARCHAR(255) NULL,
  original_price VARCHAR(255) NULL,
  sale_price VARCHAR(255) NULL,
  default_style BOOLEAN NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id serial,
  style_id INTEGER NULL,
  thumbnail_url VARCHAR(255) NULL,
  url VARCHAR(255) NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'features'
--
-- ---

DROP TABLE IF EXISTS features;

CREATE TABLE features (
  id serial,
  product_id INTEGER NULL DEFAULT NULL,
  feature VARCHAR(255) NULL,
  value VARCHAR(255) NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'related'
--
-- ---

DROP TABLE IF EXISTS related;

CREATE TABLE related (
  id serial,
  productid1 INTEGER NULL,
  productid2 INTEGER NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'cart'
--
-- ---

DROP TABLE IF EXISTS cart;

CREATE TABLE cart (
  id serial PRIMARY KEY,
  user_session INTEGER NULL,
  product_id INTEGER NULL,
  active BOOLEAN
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE skus ADD CONSTRAINT skus_style_id_fkey FOREIGN KEY (style_id) REFERENCES styles(id);
ALTER TABLE styles ADD CONSTRAINT styles_product_id_fkey FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE photos ADD CONSTRAINT photos_style_id_fkey FOREIGN KEY (style_id) REFERENCES styles (id);
ALTER TABLE features ADD CONSTRAINT features_product_id_fkey FOREIGN KEY (product_id) REFERENCES products (id);
ALTER TABLE related ADD CONSTRAINT related_product_id1_fkey FOREIGN KEY (productid1) REFERENCES products (id);


-- ALTER TABLE `skus` ADD FOREIGN KEY (style_id) REFERENCES `styles` (`id`);
-- ALTER TABLE `styles` ADD FOREIGN KEY (product_id) REFERENCES `products` (`id`);
-- ALTER TABLE `photos` ADD FOREIGN KEY (style_id) REFERENCES `styles` (`id`);
-- ALTER TABLE `features` ADD FOREIGN KEY (product_id) REFERENCES `products` (`id`);
-- ALTER TABLE `related` ADD FOREIGN KEY (productid1) REFERENCES `products` (`id`);
-- ---
-- Table Properties
-- ---

-- ALTER TABLE products ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE skus ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE styles ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE photos ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE features ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE related ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO products (id,name,slogan,description,category,default_price) VALUES
-- ('','','','','','');
-- INSERT INTO skus (id,style_id,quantity,size) VALUES
-- ('','','','');
-- INSERT INTO styles (id,product_id,name,original_price,sale_price,default?) VALUES
-- ('','','','','','');
-- INSERT INTO photos (id,style_id,thumbnail_url,url) VALUES
-- ('','','','');
-- INSERT INTO features (id,product_id,feature,value) VALUES
-- ('','','','');
-- INSERT INTO related (id,productid1,productid2) VALUES
-- ('','','');