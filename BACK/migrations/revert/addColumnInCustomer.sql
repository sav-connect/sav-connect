-- Revert savconnect:addColumnInCustomer from pg

BEGIN;

ALTER TABLE "customer"
    DROP COLUMN "phone_two";
    
ALTER TABLE "customer"
    DROP COLUMN "customer_detail";

COMMIT;
