
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX - Relations have been run - XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ');
var Class = require('../src/models/class');
var ClassType = require('../src/models/class_type');
var Contact = require('../src/models/contact');
var EmergencyContact = require('../src/models/emergency_contact');
var Family = require('../src/models/family');
var Grade = require('../src/models/grade');
var Member = require('../src/models/member');
var MemberClass = require('../src/models/member_class');
var MemberGrade = require('../src/models/member_grade');
var Photo = require('../src/models/photo');
var ATag = require('../src/models/tag');
var Technique = require('../src/models/technique');
var TechniquePhoto = require('../src/models/technique_photo');
var TechniqueSet = require('../src/models/technique_set');
var TechniqueTag = require('../src/models/technique_tag');
var TechniqueVideo = require('../src/models/technique_video');
var Video = require('../src/models/video');


Class.belongsTo(ClassType, {contraints: true, onDelete: 'RESTRICT', onUpdate: 'RESTRICT', foreignKey: 'class_type_id'})
ClassType.hasMany(Class, { foreignKey: 'class_type_id'});

Class.belongsToMany(Member, { through: MemberClass, foreignKey: 'class_id', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });
Member.belongsToMany(Class, { through: MemberClass, foreignKey: 'hb_id', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });

Grade.belongsToMany(Member, { through: MemberGrade, foreignKey: 'grade_id', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });
Member.belongsToMany(Grade, { through: MemberGrade, foreignKey: 'hb_id', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });

Member.belongsTo(Family, {contraints: true, onDelete: 'RESTRICT', onUpdate: 'RESTRICT', foreignKey: 'family_id'})
Family.hasMany(Member, { foreignKey: 'family_id'});

//Member - class_type_id
//Class Type
Member.belongsTo(ClassType, {contraints: true, onDelete: 'RESTRICT', onUpdate: 'RESTRICT', foreignKey: 'preferred_class_type_id'})
ClassType.hasMany(Class, { foreignKey: 'hb_id'});

//Member - emergency_contact_id
//Emergecy Contact
Member.belongsTo(EmergencyContact, {contraints: true, onDelete: 'RESTRICT', onUpdate: 'RESTRICT', foreignKey: 'emergency_contact_id'})
EmergencyContact.hasMany(Member, { foreignKey: 'emergency_contact_id'});

//Family
//Contact - address_id
Family.belongsTo(Contact, {contraints: true, onDelete: 'RESTRICT', onUpdate: 'RESTRICT', foreignKey: 'address_id'})
Contact.hasMany(Family, { foreignKey: 'address_id'});

//TechniqueSet
// Grade - grade_id
Technique.belongsTo(Grade, {contraints: true, onDelete: 'RESTRICT', onUpdate: 'RESTRICT', foreignKey: 't_grade'})
Grade.hasMany(Technique, { foreignKey: 't_grade'});

//TechniqueSet - t_id
//TechniqueSet Set - id
Technique.belongsTo(TechniqueSet, {contraints: true, onDelete: 'RESTRICT', onUpdate: 'RESTRICT', foreignKey: 't_id'})
TechniqueSet.hasMany(Technique, { foreignKey: 't_id'});

//TechniqueSet - t_id
//TechniqueSet Photo - id
Technique.belongsToMany(Photo, { through: TechniquePhoto, foreignKey: 't_id', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });
Photo.belongsToMany(Technique, { through: TechniquePhoto, foreignKey: 'id', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });

//TechniqueSet - t_id
//TechniqueSet Tag - tag_id
Technique.belongsToMany(ATag, { through: TechniqueTag, foreignKey: 't_id', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });
ATag.belongsToMany(Technique, { through: TechniqueTag, foreignKey: 'tag_id', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });


//TechniqueSet - t_id
//TechniqueSet Video - id
Technique.belongsToMany(Video, { through: TechniqueVideo, foreignKey: 't_id', onDelete: 'NO ACTION', onUpdate: 'CASCADE' });
Video.belongsToMany(Technique, { through: TechniqueVideo, foreignKey: 'id', onDelete: 'NO ACTION', onUpdate: 'CASCADE', });

