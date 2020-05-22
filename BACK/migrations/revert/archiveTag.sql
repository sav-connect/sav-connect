-- Revert savconnect:archiveTag from pg

BEGIN;

ALTER TABLE "tag" DROP COLUMN "actif" ;

COMMIT;
