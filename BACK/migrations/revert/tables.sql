-- Revert savconnect:tables from pg

BEGIN;

DROP TABLE "customer", "order_repair", "order_detail", "tag", "user", "product", "order_repair_product", "order_repair_tag", "role", "order_repair_user", "order_repair_action", "action";

COMMIT;
