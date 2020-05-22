-- Revert savconnect:interval from pg

BEGIN;

ALTER TABLE "order_repair" DROP COLUMN "interval_repair";
ALTER TABLE "order_repair" ADD COLUMN "interval_repair" interval;

COMMIT;
