-- Deploy savconnect:add_role to pg

BEGIN;

INSERT INTO "role" ("name") VALUES 
('Employés'),
('Administrateur');

COMMIT;
