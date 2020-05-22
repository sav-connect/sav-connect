-- Revert savconnect:addToken from pg

BEGIN;

ALTER TABLE "user" DROP token; 

COMMIT;
