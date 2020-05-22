-- Deploy savconnect:updateTables to pg

BEGIN;

ALTER TABLE "order_detail" ADD COLUMN "is-pay" text;

ALTER TABLE "action" ADD COLUMN "is-blocked" int DEFAULT 0 NOT NULL;
ALTER TABLE "action" ADD COLUMN "archive" int DEFAULT 0 NOT NULL;


INSERT INTO "action" ("name","is-blocked") VALUES
('a appellé le client', 1),
('a créé la fiche', 1),
('a archivé la fiche', 1),
('a modifié la fiche', 1),
('a ajouté des produits dans la fiche', 1),
('a appellé le client',1),
('a terminé la réparation', 1),
('a commencé la réparation', 1),
('a mis à jour le client', 1),
('a envoyé le devis', 1);


COMMIT;
