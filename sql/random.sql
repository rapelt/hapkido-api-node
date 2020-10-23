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

