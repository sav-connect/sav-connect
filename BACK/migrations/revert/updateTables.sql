-- Revert savconnect:updateTables from pg

BEGIN;

ALTER TABLE "order_detail" DROP COLUMN "is-pay";

ALTER TABLE "action" DROP COLUMN "is-blocked";
ALTER TABLE "action" DROP COLUMN "archive";

COMMIT;
