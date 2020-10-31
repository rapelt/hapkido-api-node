create table if not exists class_type
(
    class_type_id int auto_increment
        primary key,
    class_type    varchar(45) not null
);

create table if not exists class
(
    class_id      int auto_increment
        primary key,
    is_grading    tinyint  not null,
    date          datetime not null,
    class_type_id int      not null,
    constraint fk_class_class_type1
        foreign key (class_type_id) references class_type (class_type_id)
);

# create index fk_class_class_type1_idx
#     on class (class_type_id);

create table if not exists contact
(
    address_id   int auto_increment
        primary key,
    street_1     varchar(100) not null,
    street_2     varchar(100) null,
    postcode     varchar(4)   not null,
    suburb       varchar(100) not null,
    phone_number varchar(20)  not null,
    state        varchar(20)  not null
);

create table if not exists emergency_contact
(
    emergency_contact_id int auto_increment
        primary key,
    name                 varchar(100) not null,
    phone_1              varchar(20)  not null,
    phone_2              varchar(20)  null
);

create table if not exists family
(
    family_id          int auto_increment
        primary key,
    name               varchar(100) not null,
    contact_address_id int          null,
    constraint fk_family_contact1
        foreign key (contact_address_id) references contact (address_id)
);

# create index fk_family_contact1_idx
#     on family (contact_address_id);

create table if not exists grade
(
    grade_id   int         not null
        primary key,
    short_name varchar(2)  null,
    long_name  varchar(20) null,
    css_class  varchar(20) null
);

create table if not exists member
(
    hb_id                   varchar(6)   not null
        primary key,
    first_name              varchar(100) not null,
    last_name               varchar(100) not null,
    dob                     datetime     null,
    occupation              varchar(100) null,
    is_active               tinyint      not null,
    is_kumdo_student        tinyint      not null,
    previous_experience     text         null,
    injury_illness          text         null,
    is_verified             tinyint      not null,
    email                   varchar(100) not null,
    preferred_class_type_id int          not null,
    family_id               int          not null,
    emergency_contact_id    int          null,
    constraint fk_member_class_type1
        foreign key (preferred_class_type_id) references class_type (class_type_id),
    constraint fk_member_emergency_contact1
        foreign key (emergency_contact_id) references emergency_contact (emergency_contact_id),
    constraint fk_member_family1
        foreign key (family_id) references family (family_id)
)
    comment 'emergency_contact_emergency_contact_id';

# create index fk_member_class_type1_idx
#     on member (preferred_class_type_id);
#
# create index fk_member_emergency_contact1_idx
#     on member (emergency_contact_id);
#
# create index fk_member_family1_idx
#     on member (family_id);

create table if not exists member_class
(
    hb_id    varchar(6) not null,
    class_id int        not null,
    primary key (hb_id, class_id),
    constraint fk_member_class_class1
        foreign key (class_id) references class (class_id),
    constraint fk_member_class_member1
        foreign key (hb_id) references member (hb_id)
);

# create index fk_member_class_class1_idx
#     on member_class (class_id);

# create index fk_member_class_member1_idx
#     on member_class (hb_id);

create table if not exists member_grade
(
    grade_id int        not null,
    hb_id    varchar(6) not null,
    class_id int        null,
    date     datetime   null,
    primary key (grade_id, hb_id),
    constraint fk_member_grade_class1
        foreign key (class_id) references class (class_id),
    constraint fk_member_grade_grade1
        foreign key (grade_id) references grade (grade_id),
    constraint fk_member_grade_member1
        foreign key (hb_id) references member (hb_id)
);

# create index fk_member_grade_class1_idx
#     on member_grade (class_id);
#
# create index fk_member_grade_member1_idx
#     on member_grade (hb_id);

