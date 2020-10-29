import {TechniqueDataModel, TechniqueGroupDataModel, TechniqueGroupModel, TechniqueModel} from "./technique-model";
import {TagModel, TechniqueTagServerModel} from "../tag/tag-model";

function mapTechniques(technique: any) {
    return {
            id: technique.t_id,
            title: technique.t_title,
            description: technique.t_description,
            grade: technique.t_grade,
            techniqueSet: technique.t_set,
            tags: technique.tags.map((tag: any) => { return tag.id})
        }
    };

function mapTechniqueToDB(technique: TechniqueModel): TechniqueDataModel {
    return {
        t_id: technique.id,
        t_set: technique.techniqueSet,
        t_grade: technique.grade,
        t_description: technique.description,
        t_title: technique.title
    };
}

function mapTagsToTechniqueTags(tags: Array<any>, id: any): Array<any> {
    return tags.map((tag) => {
        return {
           tag_id: tag,
            t_id: id
        }
    });
}

function dbToTechnqiue(technique: any, tags: any): any {
    return {
        id: technique.t_id,
        title: technique.t_title,
        description: technique.t_description,
        grade: technique.t_grade,
        techniqueSet: technique.t_set,
        tags: tags.map((tag: any) => { return tag.getDataValue('tag_id')})
    }
}

module.exports = {
    mapTechniques: mapTechniques,
    mapTechniqueToDB: mapTechniqueToDB,
    mapTagsToTechniqueTags: mapTagsToTechniqueTags,
    dbToTechnqiue: dbToTechnqiue
};
