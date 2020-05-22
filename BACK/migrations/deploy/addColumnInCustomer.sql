-- Deploy savconnect:addColumnInCustomer to pg

BEGIN;

ALTER TABLE "customer"
    ADD COLUMN "phone_two" text;
    
ALTER TABLE "customer"
    ADD COLUMN "customer_detail" text;

COMMIT;
