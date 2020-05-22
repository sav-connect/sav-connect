-- Revert savconnect:updateTable from pg

BEGIN;

ALTER TABLE "tag" ADD CONSTRAINT "tag_title_key" UNIQUE USING "title";
COMMIT;
