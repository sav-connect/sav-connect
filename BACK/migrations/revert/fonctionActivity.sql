-- Revert savconnect:fonctionActivity from pg

BEGIN;

DROP FUNCTION allactivites;

COMMIT;
