-- Revert savconnect:order_number from pg

BEGIN;

ALTER TABLE "order_repair" 
    ALTER "order_number" 
    DROP DEFAULT;

DROP SEQUENCE "order_number";



COMMIT;
