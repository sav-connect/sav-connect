-- Revert savconnect:adduser from pg

BEGIN;

DELETE FROM "user";

COMMIT;
