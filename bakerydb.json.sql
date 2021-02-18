CREATE TABLE "Categories" (
  "id" int PRIMARY KEY,
  "name" varchar
);

CREATE TABLE "Products" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "price" float,
  "description" varchar,
  "categoryId" int
);

CREATE TABLE "Customers" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "rewardsMember" boolean,
  "email" email,
  "password" password
);

CREATE TABLE "Statuses" (
  "id" int PRIMARY KEY,
  "label" varchar
);

ALTER TABLE "Categories" ADD FOREIGN KEY ("id") REFERENCES "Products" ("categoryId");
