-- Verify savconnect:fonctionActivity on pg

BEGIN;

select * from allactivites(10); 

ROLLBACK;
