# Queries to create database
We can use following queries to create database in respective databases for ERDDiagram.jpeg under **documents** folder

## PostgreSQL
--------------------
```
DROP TABLE IF EXISTS Products CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Customers CASCADE;
DROP TABLE IF EXISTS Payments CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Brands CASCADE;

CREATE TABLE "brands" (
  "brand_id" INT GENERATED ALWAYS AS IDENTITY,
  "brand_name" VARCHAR(50),
  PRIMARY KEY(brand_id)
);

CREATE TABLE "products" (
  "product_id" INT GENERATED ALWAYS AS IDENTITY,
  "brand_id" INT,
  "product_name" VARCHAR(50) NOT NULL,
  "product_description" VARCHAR(200),
  "size" VARCHAR(50),
  "color" VARCHAR(50),
  "available_product" VARCHAR(50),
  "price" VARCHAR(50),
  "weight" VARCHAR(50),
  "picture" VARCHAR(50),
  "note" VARCHAR(50),
  "product_tag" character varying(50),
  "product_in_cart" integer,
  PRIMARY KEY (product_id),
  CONSTRAINT fk_brand
      FOREIGN KEY(brand_id) 
	  REFERENCES brands(brand_id)
);

CREATE TABLE IF NOT EXISTS public.users
(
    "user_id" integer NOT NULL GENERATED ALWAYS AS IDENTITY ,
    "reg_date" character varying(50),
    "first_name" character varying(50),
    "last_name" character varying(50),
    "email" character varying(50),
    "password" character varying(50),
    "user_role" character varying(50),
    "username" character varying(50) NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
)


CREATE TABLE "customers" (
  "customer_id" INT GENERATED ALWAYS AS IDENTITY,
  "user_id"  INT,
  "address1" VARCHAR(50),
  "address2" VARCHAR(50),
  "city" VARCHAR(50),
  "state" VARCHAR(50),
  "postalCode" VARCHAR(50),
  "country" VARCHAR(50),
  "phone" INT,
  "credit_card" INT,
  "credit_card_xp_mo" VARCHAR(50),
  "credit_card_xp_yr" VARCHAR(50),
  "billing_address" VARCHAR(150),
  "billing_city" VARCHAR(50),
  "billing_region" VARCHAR(50),
  "billing_postal_code" VARCHAR(50),
  "billing_country" VARCHAR(50),
  "shipping_address" VARCHAR(150),
  "shipping_city" VARCHAR(50),
  "shipping_region" VARCHAR(50),
  "shipping_postal_code" VARCHAR(50),
  "membership_status" VARCHAR(50),
  PRIMARY KEY(customer_id),
  CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(user_id)
);

CREATE TABLE "payments" (
  "payment_id" INT GENERATED ALWAYS AS IDENTITY,
  "payment_type" VARCHAR(50),
  "payment_date" VARCHAR(50),
  "payment_status" VARCHAR(50),
  PRIMARY KEY (payment_id)
);

CREATE TABLE "orders" (
  "order_id"  INT GENERATED ALWAYS AS IDENTITY,
  "product_id" INT,
  "payment_id" INT,
  "customer_id" INT,
  "order_date" VARCHAR(50),
  "quantity" INT,
  "total_price" INT,
  "billing_address" VARCHAR(150),
  "shipping_address" VARCHAR(150),
  "color"  VARCHAR(50),
  "weight" INT,
  "price" INT,
  PRIMARY KEY(order_id),
  CONSTRAINT fk_product
      FOREIGN KEY(product_id) 
	  REFERENCES products(product_id),
  CONSTRAINT fk_payment
      FOREIGN KEY(payment_id) 
	  REFERENCES payments(payment_id),
  CONSTRAINT fk_customer
      FOREIGN KEY(customer_id) 
	  REFERENCES customers(customer_id)  
);
```