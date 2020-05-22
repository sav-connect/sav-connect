-- Deploy savconnect:alterCustomer to pg

BEGIN;

ALTER TABLE "customer" DROP CONSTRAINT customer_mail_key;

COMMIT;
