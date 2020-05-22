-- Deploy savconnect:archiveTag to pg

BEGIN;

ALTER TABLE "tag" ADD COLUMN "actif" int DEFAULT '1';

COMMIT;
