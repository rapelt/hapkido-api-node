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

select now();

SET time_zone = 'Australia/Brisbane';



SELECT `Member`.`hb_id`, `Member`.`first_name`, `Member`.`last_name`, `Member`.`dob`, `Member`.`occupation`, `Member`.`is_active`, `Member`.`is_kumdo_student`, `Member`.`previous_experience`, `Member`.`injury_illness`, `Member`.`is_verified`, `Member`.`email`, `Member`.`preferred_class_type_id`, `Member`.`family_id`, `Member`.`emergency_contact_id`, `Member_preferredClass`.`class_type_id`, `Member_preferredClass`.`class_type`, `Member_family`.`family_id`, `Member_family`.`name`, `Member_family`.`contact_address_id`, `Member_family_contact_address_id`.`address_id`, `Member_family_contact_address_id`.`street_1`, `Member_family_contact_address_id`.`street_2`, `Member_family_contact_address_id`.`postcode`, `Member_family_contact_address_id`.`suburb`, `Member_family_contact_address_id`.`phone_number`, `Member_family_contact_address_id`.`state`, `Member_gradings`.`hb_id`, `Member_gradings`.`grade_id`, `Member_gradings`.`date`, `Member_gradings`.`class_id` FROM `member` `Member` LEFT JOIN `class_type` `Member_preferredClass` ON `Member_preferredClass`.`class_type_id`=`Member`.`preferred_class_type_id`  LEFT JOIN `family` `Member_family` ON `Member_family`.`family_id`=`Member`.`family_id`  LEFT JOIN `contact` `Member_family_contact_address_id` ON `Member_family_contact_address_id`.`address_id`=`Member_family`.`contact_address_id`  LEFT JOIN `member_grade` `Member_gradings` ON `Member_gradings`.`grade_id`=Member.id WHERE `Member`.`deletedAt` IS NULL;


SELECT `Member`.`hb_id` AS `Member_hb_id`, `Member`.`first_name` AS `Member_first_name`, `Member`.`last_name` AS `Member_last_name`, `Member`.`dob` AS `Member_dob`, `Member`.`occupation` AS `Member_occupation`, `Member`.`is_active` AS `Member_is_active`, `Member`.`is_kumdo_student` AS `Member_is_kumdo_student`, `Member`.`previous_experience` AS `Member_previous_experience`, `Member`.`injury_illness` AS `Member_injury_illness`, `Member`.`is_verified` AS `Member_is_verified`, `Member`.`email` AS `Member_email`, `Member`.`preferred_class_type_id` AS `Member_preferred_class_type_id`, `Member`.`family_id` AS `Member_family_id`, `Member`.`createdAt` AS `Member_createdAt`, `Member`.`updatedAt` AS `Member_updatedAt`, `Member`.`deletedAt` AS `Member_deletedAt`, `Member`.`emergency_contact_id` AS `Member_emergency_contact_id`, `Member_preferredClass`.`class_type_id` AS `Member_preferredClass_class_type_id`, `Member_preferredClass`.`class_type` AS `Member_preferredClass_class_type`, `Member_preferredClass`.`createdAt` AS `Member_preferredClass_createdAt`, `Member_preferredClass`.`updatedAt` AS `Member_preferredClass_updatedAt`, `Member_preferredClass`.`deletedAt` AS `Member_preferredClass_deletedAt`, `Member_family`.`family_id` AS `Member_family_family_id`, `Member_family`.`name` AS `Member_family_name`, `Member_family`.`createdAt` AS `Member_family_createdAt`, `Member_family`.`updatedAt` AS `Member_family_updatedAt`, `Member_family`.`deletedAt` AS `Member_family_deletedAt`, `Member_family`.`contact_address_id` AS `Member_family_contact_address_id`, `Member_family_contact_address_id`.`address_id` AS `Member_family_contact_address_id_address_id`, `Member_family_contact_address_id`.`street_1` AS `Member_family_contact_address_id_street_1`, `Member_family_contact_address_id`.`street_2` AS `Member_family_contact_address_id_street_2`, `Member_family_contact_address_id`.`postcode` AS `Member_family_contact_address_id_postcode`, `Member_family_contact_address_id`.`suburb` AS `Member_family_contact_address_id_suburb`, `Member_family_contact_address_id`.`phone_number` AS `Member_family_contact_address_id_phone_number`, `Member_family_contact_address_id`.`state` AS `Member_family_contact_address_id_state`, `Member_family_contact_address_id`.`createdAt` AS `Member_family_contact_address_id_createdAt`, `Member_family_contact_address_id`.`updatedAt` AS `Member_family_contact_address_id_updatedAt`, `Member_family_contact_address_id`.`deletedAt` AS `Member_family_contact_address_id_deletedAt` FROM `member` `Member` LEFT JOIN `class_type` `Member_preferredClass` ON `Member_preferredClass`.`class_type_id`=`Member`.`preferred_class_type_id`  LEFT JOIN `family` `Member_family` ON `Member_family`.`family_id`=`Member`.`family_id`  LEFT JOIN `contact` `Member_family_contact_address_id` ON `Member_family_contact_address_id`.`address_id`=`Member_family`.`contact_address_id` WHERE `Member`.`deletedAt` IS NULL


SELECT `Member`.`hb_id` AS `Member_hb_id`, `Member`.`first_name` AS `Member_first_name`, `Member`.`last_name` AS `Member_last_name`, `Member`.`dob` AS `Member_dob`, `Member`.`occupation` AS `Member_occupation`, `Member`.`is_active` AS `Member_is_active`, `Member`.`is_kumdo_student` AS `Member_is_kumdo_student`, `Member`.`previous_experience` AS `Member_previous_experience`, `Member`.`injury_illness` AS `Member_injury_illness`, `Member`.`is_verified` AS `Member_is_verified`, `Member`.`email` AS `Member_email`, `Member`.`preferred_class_type_id` AS `Member_preferred_class_type_id`, `Member`.`family_id` AS `Member_family_id`, `Member`.`createdAt` AS `Member_createdAt`, `Member`.`updatedAt` AS `Member_updatedAt`, `Member`.`deletedAt` AS `Member_deletedAt`, `Member`.`emergency_contact_id` AS `Member_emergency_contact_id`, `Member_preferredClass`.`class_type_id` AS `Member_preferredClass_class_type_id`, `Member_preferredClass`.`class_type` AS `Member_preferredClass_class_type`, `Member_preferredClass`.`createdAt` AS `Member_preferredClass_createdAt`, `Member_preferredClass`.`updatedAt` AS `Member_preferredClass_updatedAt`, `Member_preferredClass`.`deletedAt` AS `Member_preferredClass_deletedAt`, `Member_family`.`family_id` AS `Member_family_family_id`, `Member_family`.`name` AS `Member_family_name`, `Member_family`.`createdAt` AS `Member_family_createdAt`, `Member_family`.`updatedAt` AS `Member_family_updatedAt`, `Member_family`.`deletedAt` AS `Member_family_deletedAt`, `Member_family`.`contact_address_id` AS `Member_family_contact_address_id`, `Member_family_contact_address_id`.`address_id` AS `Member_family_contact_address_id_address_id`, `Member_family_contact_address_id`.`street_1` AS `Member_family_contact_address_id_street_1`, `Member_family_contact_address_id`.`street_2` AS `Member_family_contact_address_id_street_2`, `Member_family_contact_address_id`.`postcode` AS `Member_family_contact_address_id_postcode`, `Member_family_contact_address_id`.`suburb` AS `Member_family_contact_address_id_suburb`, `Member_family_contact_address_id`.`phone_number` AS `Member_family_contact_address_id_phone_number`, `Member_family_contact_address_id`.`state` AS `Member_family_contact_address_id_state`, `Member_family_contact_address_id`.`createdAt` AS `Member_family_contact_address_id_createdAt`, `Member_family_contact_address_id`.`updatedAt` AS `Member_family_contact_address_id_updatedAt`, `Member_family_contact_address_id`.`deletedAt` AS `Member_family_contact_address_id_deletedAt`, `Member_gradings`.`hb_id` AS `Member_gradings_hb_id`, `Member_gradings`.`grade_id` AS `Member_gradings_grade_id`, `Member_gradings`.`date` AS `Member_gradings_date`, `Member_gradings`.`createdAt` AS `Member_gradings_createdAt`, `Member_gradings`.`updatedAt` AS `Member_gradings_updatedAt`, `Member_gradings`.`deletedAt` AS `Member_gradings_deletedAt`, `Member_gradings`.`class_id` AS `Member_gradings_class_id` FROM `member` `Member` LEFT JOIN `class_type` `Member_preferredClass` ON `Member_preferredClass`.`class_type_id`=`Member`.`preferred_class_type_id`  LEFT JOIN `family` `Member_family` ON `Member_family`.`family_id`=`Member`.`family_id`  LEFT JOIN `contact` `Member_family_contact_address_id` ON `Member_family_contact_address_id`.`address_id`=`Member_family`.`contact_address_id`  LEFT JOIN `member_grade` `Member_gradings` ON `Member_gradings`.`hb_id`=`Member`.`hb_id` WHERE `Member`.`deletedAt` IS NULL
