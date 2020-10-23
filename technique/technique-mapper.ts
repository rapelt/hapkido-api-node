import {TechniqueDataModel, TechniqueGroupDataModel, TechniqueGroupModel, TechniqueModel} from "./technique-model";
import {TagModel, TechniqueTagServerModel} from "../tag/tag-model";

function mapTechniques(techniques: Array<TechniqueDataModel>, tags: { t_id: number, tag_id: number}[]) {
    const clientTechniques: TechniqueModel[] = techniques.map((technique) => {
        const techniqueTag: number[] = tags.filter((t) => t.t_id === technique.t_id ).map((r) => r.tag_id);
        return {
            id: technique.t_id,
            title: technique.t_title,
            description: technique.t_description,
            grade: technique.t_grade,
            techniqueSet: technique.t_set,
            tags: techniqueTag
        }

    });

    return clientTechniques;
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

function mapTagsToTechniqueTags(tags: Array<TagModel>, techniqueId: number): Array<TechniqueTagServerModel> {
    return tags.map((tag) => {
        return {
           t_id: techniqueId,
           tag_id: tag.id
        }
    });
}

module.exports = {
    mapTechniques: mapTechniques,
    mapTechniqueToDB: mapTechniqueToDB,
    mapTagsToTechniqueTags: mapTagsToTechniqueTags
};
