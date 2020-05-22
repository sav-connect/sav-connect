-- Revert savconnect:newViewforSav from pg

BEGIN;

DROP VIEW "savs";

COMMIT;
