-- Revert savconnect:updateViewActivity from pg

BEGIN;

DROP VIEW "activity";

COMMIT;
