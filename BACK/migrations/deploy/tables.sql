-- Deploy savconnect:tables to pg

BEGIN;

CREATE TABLE "tag" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title text NOT NULL UNIQUE,
    color text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz
);

CREATE TABLE "customer" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text NOT NULL,
    lastname text NOT NULL,
    mail text UNIQUE,
    phone text NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz
);

CREATE TABLE "action" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz
);

CREATE TABLE "role" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz
);

CREATE TABLE "user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text NOT NULL,
    lastname text NOT NULL,
    mail text NOT NULL UNIQUE,
    "password" text NOT NULL,
    actif int NOT NULL DEFAULT 1,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz,
    role_id int NOT NULL REFERENCES "role"(id)
);

CREATE TABLE "product" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ref text NOT NULL,
    "name" text NOT NULL,
    price text NOT NULL,
    mesure text NOT NULL,
    actif int NOT NULL DEFAULT 1,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz
);

CREATE TABLE "order_repair" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_number text UNIQUE,
    picture text,
    device_name text NOT NULL,
    device_brand text,
    date_enter timestamp NOT NULL DEFAULT now(),
    interval_repair interval,
    actif int DEFAULT 1,
    urgent int DEFAULT 0,
    customer_id int NOT NULL REFERENCES "customer"(id),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz 
);

CREATE TABLE "order_detail" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    panne text,
    intervention text,
    date_intervention timestamp,
    date_devis timestamp,
    amount text,
    amount_devis text,
    recall_devis int,
    recall_finish int,
    order_number_id text REFERENCES "order_repair"(order_number)
);

CREATE TABLE "order_repair_tag" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_repair_id int NOT NULL REFERENCES "order_repair"(id),
    tag_id int NOT NULL REFERENCES "tag"(id),
    user_id int NOT NULL REFERENCES "user"(id),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz
);

CREATE TABLE "order_repair_action" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_repair_id int NOT NULL REFERENCES "order_repair"(id),
    action_id int NOT NULL REFERENCES "action"(id),
    user_id int NOT NULL REFERENCES "user"(id),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz
);

CREATE TABLE "order_repair_user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id int NOT NULL REFERENCES "user"(id),
    order_repair_id int NOT NULL REFERENCES "order_repair"(id),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz
);

CREATE TABLE "order_repair_product" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_repair_id int NOT NULL REFERENCES "order_repair"(id),
    product_id int NOT NULL REFERENCES "product"(id),
    user_id int NOT NULL REFERENCES "user"(id),
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz
);


COMMIT;
