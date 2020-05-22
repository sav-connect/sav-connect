-- Deploy savconnect:adduser to pg

BEGIN;

INSERT INTO "user" (firstname, lastname, mail, "password", role_id) VALUES 
('Admin', 'Admin', 'admin@admin.fr', '$2b$10$FKRQ555eV.ChxrsSiqTnAulrGxXIcyuSXxZ1AX2q0j160WYILsgYS', 2);

COMMIT;
