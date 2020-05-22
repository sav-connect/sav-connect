-- Revert savconnect:newcolumnOntable from pg

BEGIN;

ALTER TABLE "order_detail" DROP COLUMN "devis_is_accepted";

COMMIT;
