-- Revert savconnect:tablesPannes from pg

BEGIN;

DROP TABLE "order_repair_config_panne", "config_panne";

ALTER TABLE "order_repair_tag" DROP CONSTRAINT allUniqueTag;
ALTER TABLE "order_repair_product" DROP CONSTRAINT allUniqueProduct;
ALTER TABLE "order_repair_product" DROP COLUMN "qty;"

COMMIT;
