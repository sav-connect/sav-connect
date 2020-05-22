-- Deploy savconnect:updateTable to pg

BEGIN;

ALTER TABLE "tag" DROP CONSTRAINT "tag_title_key";

COMMIT;
