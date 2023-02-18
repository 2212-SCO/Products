drop database sdcproducts;
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

DROP TABLE products CASCADE;

CREATE TABLE products (
  id Serial,
  name text NULL,
  slogan text NULL,
  description text NULL,
  category text NULL,
  default_price text NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'skus'
--
-- ---

DROP TABLE skus CASCADE;

CREATE TABLE skus (
  id Serial,
  style_id INTEGER NULL DEFAULT NULL,
  size text NULL,
  quantity INTEGER NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'styles'
--
-- ---
--index

DROP TABLE styles CASCADE;

CREATE TABLE styles (
  id serial,
  product_id INTEGER NULL,
  name text NULL,
  original_price text NULL,
  sale_price text NULL,
  default_style BOOLEAN NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE photos CASCADE;

CREATE TABLE photos (
  id serial,
  style_id INTEGER NULL,
  url text NULL,
  thumbnail_url text NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'features'
--
-- ---

DROP TABLE features CASCADE;

CREATE TABLE features (
  id serial,
  product_id INTEGER NULL DEFAULT NULL,
  feature text NULL,
  value text NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'related'
--
-- ---

DROP TABLE related CASCADE;

CREATE TABLE related (
  id serial,
  current_product_id INTEGER NULL,
  related_product_id INTEGER NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'cart'
--
-- ---

DROP TABLE cart CASCADE;

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
ALTER TABLE styles ADD CONSTRAINT styles_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE photos ADD CONSTRAINT photos_style_id_fkey FOREIGN KEY (style_id) REFERENCES styles(id);
ALTER TABLE features ADD CONSTRAINT features_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE related ADD CONSTRAINT related_current_product_id_fkey FOREIGN KEY (current_product_id) REFERENCES products(id);


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

CREATE INDEX styles_index ON styles (product_id);
CREATE INDEX features_index ON features (product_id);
CREATE INDEX related_index ON related (current_product_id);
CREATE INDEX skus_index ON skus (style_id);
CREATE INDEX photos_index ON photos (style_id);




\copy products from './csv/product.csv' WITH (FORMAT csv, HEADER true);
\copy features from './csv/features.csv' WITH (FORMAT csv, HEADER true);
\copy styles from './csv/styles.csv' WITH (FORMAT csv, HEADER true);
\copy skus from './csv/skus.csv' WITH (FORMAT csv, HEADER true);
\copy related from './csv/related.csv' WITH (FORMAT csv, HEADER true);
\copy photos (id,style_id, url, thumbnail_url) from './csv/photos.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',', QUOTE E'\b');

-- WITH CSV DELIMITER E'\t' QUOTE E'\b' NULL AS '';