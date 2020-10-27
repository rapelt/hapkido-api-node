import {TechniqueTagServerModel} from "../tag/tag-model";

var connection = require('../db/rdsconnect');

var techniqueTagColumns = "t_id, tag_id";

function addTagToNewTechnique(tags: Array<TechniqueTagServerModel>) {
    var pool = connection.getpool();

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err: any, connection: any) {
            if (err) {
                reject(err);
            }

            const values: string = tags.map((tag) => {
                return `(${tag.t_id}, ${tag.tag_id})`
            }).join(', ')

            var query = 'INSERT INTO technique_tag (' + techniqueTagColumns + ') Values ' + values;

            console.log(query);

            connection.query(query, function (error: any, results: any, fields: any) {
                connection.release();

                if (error) {
                    reject(error);
                }

                const tagIds: Array<number> = tags.map((tag) => {
                    return tag.tag_id
                });

                resolve(tagIds);
            });
        });
    });
};

function removeTagFromTechnique(tagName: string) {
};

module.exports = {
    addTagToNewTechnique: addTagToNewTechnique,
    removeTagFromTechnique: removeTagFromTechnique
};
