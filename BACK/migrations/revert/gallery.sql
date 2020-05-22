-- Revert savconnect:gallery from pg

BEGIN;

DROP TABLE "gallery", "order_repair_gallery";

COMMIT;
