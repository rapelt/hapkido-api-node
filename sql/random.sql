select * from member;

select * from member_grade;

drop table technique;


INSERT INTO `hapkido_local`.technique_set (id, name) VALUES (0, 'Makko Chigi');

select * from technique_set;


update technique t SET t.t_title = 'Makko Chigi 5', t.t_description = 'sdf', t.t_grade = 2, t.t_set = 3 WHERE t.`t_id` = 5;

UPDATE technique t SET t.`t_title` = 'Makko Chigi 5' WHERE t.`t_id` = 5;

SHOW VARIABLES LIKE "max_connections";

show status where `variable_name` = 'Threads_connected';


select * from hapkido_local.technique_set;

update technique_set set active = FALSE where id = 11;


insert into technique_tag (t_id, tag_id) values (3, 13), (4, 14);

select * from hapkidodb.member;



SELECT `class`.`class_id` AS `classId`, `class`.`is_grading` AS `isGrading`, `class`.`date`, `class`.`class_type_id`, `members`.`hb_id` AS `members.hb_id`, `members->member_class`.`hb_id` AS `members.member_class.hb_id`, `members->member_class`.`class_id` AS `members.member_class.class_id` FROM `class` AS `class` LEFT OUTER JOIN ( `member_class` AS `members->member_class` INNER JOIN `member` AS `members` ON `members`.`hb_id` = `members->member_class`.`hb_id`) ON `class`.`class_id` = `members->member_class`.`class_id`;

 SELECT `class`.`class_id`, `class`.`is_grading`, `class`.`date`, `class`.`class_type_id`, `class_type`.`class_type_id` AS `class_type.class_type_id`, `class_type`.`class_type` AS `class_type.class_type` FROM `class` AS `class` LEFT OUTER JOIN `class_type` AS `class_type` ON `class`.`class_type_id` = `class_type`.`class_type_id` WHERE `class`.`class_id` = 3;


 SELECT `class`.`class_id`, `class`.`is_grading`, `class`.`date`, `class`.`createdAt`, `class`.`updatedAt`, `class`.`deletedAt`, `class`.`class_type_id`, `members`.`hb_id` AS `members.hb_id`, `members->member_class`.`hb_id` AS `members.member_class.hb_id`, `members->member_class`.`class_id` AS `members.member_class.class_id`, `class_type`.`class_type_id` AS `class_type.class_type_id`, `class_type`.`class_type` AS `class_type.class_type` FROM `class` AS `class` LEFT OUTER JOIN ( `member_class` AS `members->member_class` INNER JOIN `member` AS `members` ON `members`.`hb_id` = `members->member_class`.`hb_id`) ON `class`.`class_id` = `members->member_class`.`class_id` LEFT OUTER JOIN `class_type` AS `class_type` ON `class`.`class_type_id` = `class_type`.`class_type_id` WHERE (`class`.`deletedAt` IS NULL AND `class`.`class_id` = 662);


select * from member_class where class_id = 662;