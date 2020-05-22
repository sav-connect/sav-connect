-- Revert savconnect:newViewForActivity from pg

BEGIN;

DROP VIEW "activity";

COMMIT;
