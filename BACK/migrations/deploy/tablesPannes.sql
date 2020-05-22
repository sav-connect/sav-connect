-- Deploy savconnect:tablesPannes to pg

BEGIN;

CREATE TABLE "config_panne" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text UNIQUE,
    "actif" int DEFAULT 0 NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz
);

CREATE TABLE "order_repair_config_panne" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "order_repair_id" int NOT NULL REFERENCES "order_repair"("id"),
    "config_panne_id" int NOT NULL REFERENCES "config_panne"("id"),
    "user_id" int NOT NULL REFERENCES "user"("id"),
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz,
    UNIQUE("order_repair_id", "config_panne_id", "user_id")
);

ALTER TABLE "order_repair_tag" ADD CONSTRAINT allUniqueTag UNIQUE ("order_repair_id", "tag_id", "user_id");

ALTER TABLE "order_repair_product" ADD CONSTRAINT allUniqueProduct UNIQUE ("order_repair_id", "product_id", "user_id");
ALTER TABLE "order_repair_product" ADD COLUMN "qty" int DEFAULT 1 NOT NULL;


COMMIT;
