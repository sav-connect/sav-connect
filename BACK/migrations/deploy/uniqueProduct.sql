-- Deploy savconnect:uniqueProduct to pg

BEGIN;

ALTER TABLE "product" ADD UNIQUE (ref);

COMMIT;
