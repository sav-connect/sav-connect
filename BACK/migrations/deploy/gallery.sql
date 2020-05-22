-- Deploy savconnect:gallery to pg

BEGIN;

CREATE TABLE "gallery" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL,
    "primary" int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz
);

CREATE TABLE "order_repair_gallery" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    gallery_id int NOT NULL REFERENCES "gallery"(id),
    order_repair_id text NOT NULL REFERENCES "order_repair"(order_number),
    user_id int NOT NULL REFERENCES "user"(id),
    created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE "order_repair_gallery" ADD CONSTRAINT allUniqueGallery UNIQUE ("order_repair_id", "gallery_id", "user_id");


COMMIT;
