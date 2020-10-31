alter table technique_set
	add active boolean default true not null;

alter table class
	add createdAt DATETIME null;

alter table class
	add updatedAt DATETIME null;