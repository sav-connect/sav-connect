-- Deploy savconnect:addToken to pg

BEGIN;

ALTER TABLE "user" ADD token text; 


COMMIT;
