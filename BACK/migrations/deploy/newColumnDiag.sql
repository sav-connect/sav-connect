-- Deploy savconnect:newColumnDiag to pg

BEGIN;

ALTER TABLE "order_detail" ADD COLUMN "amount_diag" text;

COMMIT;
