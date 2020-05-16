create table technique
(
    t_id          int auto_increment,
    t_title       varchar(200)     not null unique,
    t_description longtext null,
    t_grade       int      null,
    t_set         int      null,

    primary key (t_id),

    constraint technique_t_id_uindex
        unique (t_id),
    constraint technique_grade_grade_id_fk
        foreign key (t_grade) references grade (grade_id)
            on update set null
);

alter table technique
	add constraint technique_technique_set_id_fk
		foreign key (t_set) references technique_set (id);

create table technique_set
(
	id int auto_increment,
	name varchar(200) not null,
	primary key (id)
);

create unique index technique_set_id_uindex
	on technique_set (id);

create unique index technique_set_name_uindex
	on technique_set (name);

create table tag
(
	id int auto_increment,
	name varchar(200) not null,
	primary key (id)
);

create unique index tag_id_uindex
	on tag (id);

create unique index tag_name_uindex
	on tag (name);


create table technique_tag
(
    t_id   int not null,
    tag_id int not null,
    primary key (tag_id, t_id),
    constraint technique_tag_tag_id_fk
        foreign key (tag_id) references tag (id),
    constraint technique_tag_technique_t_id_fk
        foreign key (t_id) references technique (t_id)
);

create table photo_tag
(
    id   int not null,
    tag_id int not null,
    primary key (tag_id, id),
    constraint photo_tag_tag_id_fk
        foreign key (tag_id) references tag (id),
    constraint photo_tag_technique_id_fk
        foreign key (id) references photo (id)
);

create table video_tag
(
    id   int not null,
    tag_id int not null,
    primary key (tag_id, id),
    constraint video_tag_tag_id_fk
        foreign key (tag_id) references tag (id),
    constraint video_tag_technique_id_fk
        foreign key (id) references video (id)
);

create table photo
(
    id                 int auto_increment,
    file_name          varchar(200) not null,
    file_type          varchar(200) null,
    original_file_name varchar(200) null,
    folder             varchar(200) null,
    size               varchar(20)  null,
    url                varchar(400) not null,
    constraint photo_id_uindex
        unique (id),
    constraint photo_url_uindex
        unique (url),
);

# alter table photo
#     add primary key (id);
#
# create unique index photo_id_uindex
# 	on photo (id);

create table video
(
    id                 int auto_increment,
    file_name          varchar(200) not null,
    file_type          varchar(200) null,
    original_file_name varchar(200) null,
    folder             varchar(200) null,
    url                varchar(400) not null,
    constraint video_id_uindex
        unique (id),
    constraint video_url_uindex
        unique (url),
    primary key (id)
);

# create unique index video_id_uindex
# 	on video (id);

create table technique_photo
(
    t_id int not null,
    p_id int not null,
    constraint table_name_photo_id_fk
        foreign key (p_id) references photo (id),
    constraint table_name_technique_t_id_fk
        foreign key (t_id) references technique (t_id)
);


create table technique_video
(
    t_id int not null,
    v_id int not null,
    constraint technique_video_video_id_fk
        foreign key (v_id) references video (id),
    constraint technique_video_technique_t_id_fk
        foreign key (t_id) references technique (t_id)
);
