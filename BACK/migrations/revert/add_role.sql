-- Revert savconnect:add_role from pg

BEGIN;
DELETE FROM "order_repair_user";
DELETE FROM "order_repair_tag";
DELETE FROM "user";
DELETE FROM "role" WHERE "name"='Employés';
DELETE FROM "role" WHERE "name"='Administrateur' ;


COMMIT;
