-- Deploy savconnect:newcolumnOntable to pg

BEGIN;

ALTER TABLE "order_detail" ADD COLUMN "devis_is_accepted" text;

COMMIT;
