-- Revert savconnect:uniqueProduct from pg

BEGIN;

ALTER TABLE "product" DROP CONSTRAINT product_ref_key ;

COMMIT;
