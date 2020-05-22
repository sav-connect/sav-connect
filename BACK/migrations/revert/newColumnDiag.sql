-- Revert savconnect:newColumnDiag from pg

BEGIN;

ALTER TABLE "order_detail" DROP COLUMN "amount_diag";

COMMIT;
