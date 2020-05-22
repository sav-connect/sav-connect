-- Deploy savconnect:updateViewActivity to pg

BEGIN;

-- XXX Add DDLs here.
DROP VIEW "activity";

CREATE view "activity" as
SELECT 
	'tag' as "type",
	title as "name",
	"tag".color as "color",
	"order_repair".order_number as order_number,
	"user".lastname as lastname,
	"user".firstname as firstname,
	"order_repair_tag".created_at as created_at,
	"order_repair"."customer_id" as customer_id,
	"user".id as user_id 
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
	"order_repair_action".created_at as created_at,
	"order_repair"."customer_id" as customer_id,
	"user".id as user_id 
	FROM "action" 
	JOIN "order_repair_action" ON "order_repair_action".action_id="action".id 
	JOIN "order_repair" ON "order_repair".id="order_repair_action".order_repair_id 
	JOIN "user" ON "user".id="order_repair_action".user_id
ORDER BY created_at desc;

COMMIT;
