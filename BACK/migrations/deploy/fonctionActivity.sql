-- Deploy savconnect:fonctionActivity to pg

BEGIN;
CREATE FUNCTION allactivites(lim int) 
RETURNS table (
	"type" text,
	"name" text,
	color text,
	order_number text,
	lastname text,
	firstname text,
	created_at timestamptz
	) 
AS $$ 
BEGIN
	return query SELECT 
	'tag' as "type",
	title as "name",
	"tag".color as "color",
	"order_repair".order_number as order_number,
	"user".lastname as lastname,
	"user".firstname as firstname,
	"order_repair_tag".created_at as created_at 
	FROM "tag" 
	JOIN "order_repair_tag" ON "order_repair_tag".tag_id="tag".id 
	JOIN "order_repair" ON "order_repair".id="order_repair_tag".order_repair_id 
	JOIN "user" ON "user".id="order_repair_tag".user_id
UNION
	SELECT 
	'action' as "type",
	"action".name as "name",
	'' as "color",
	"order_repair".order_number as "order_number",
	"user".lastname as lastname ,
	"user".firstname as firstname ,
	"order_repair_action".created_at as created_at 
	FROM "action" 
	JOIN "order_repair_action" ON "order_repair_action".action_id="action".id 
	JOIN "order_repair" ON "order_repair".id="order_repair_action".order_repair_id 
	JOIN "user" ON "user".id="order_repair_action".user_id
ORDER BY created_at DESC LIMIT lim;
END;

$$ LANGUAGE 'plpgsql';

COMMIT;
