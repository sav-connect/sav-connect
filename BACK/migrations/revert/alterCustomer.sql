-- Revert savconnect:alterCustomer from pg

BEGIN;

ALTER TABLE "customer" ADD CONSTRAINT UNIQUE ("mail");

COMMIT;
