-- Deploy savconnect:newViewforSav to pg

BEGIN;

CREATE view "savs" as
select "order_repair".*, "customer".lastname, "customer".firstname, array_agg("tag".color ) as tags_colors ,array_agg("tag".title ) as tags_title
from "order_repair"
join "customer"
on "customer".id="order_repair".customer_id
left join "order_repair_tag"
on "order_repair_tag".order_repair_id="order_repair".id
left join "tag"
on "tag".id="order_repair_tag".tag_id
group by "order_repair".id, "customer".lastname, "customer".firstname
;


COMMIT;
