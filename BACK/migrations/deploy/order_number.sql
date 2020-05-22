-- Deploy savconnect:order_number to pg

BEGIN;


CREATE SEQUENCE "order_number";

ALTER TABLE "order_repair" 
    ALTER "order_number" 
    SET DEFAULT CONCAT('SAV', '', lpad(to_hex(nextval('order_number'::regclass)),10,'0'));


COMMIT;
