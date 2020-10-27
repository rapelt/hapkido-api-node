import {TechniqueDataModel, TechniqueGroupDataModel} from "./technique-model";

var connection = require('../db/rdsconnect');

var techniqueColumns = "t_id, t_title, t_description, t_grade, t_set";
var techniqueSetColumns = "id, name";


function createTechnique(technique: TechniqueDataModel) {
    var pool = connection.getpool();

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err: any, connection: any) {
            if (err) {
                reject(err);
            }

            var query = 'INSERT INTO technique (' + techniqueColumns +  ') VALUES(?, ?, ?, ?, ?);';

            connection.query(query, [0, technique.t_title, technique.t_description, technique.t_grade, technique.t_set], function (error: any, results: any, fields: any) {
                connection.release();

                if (error) {
                    reject(error);
                }

                if(results){
                    resolve(results.insertId);

                }

                resolve(results);
            });
        });
    });
};

function updateTechnique(technique: TechniqueDataModel) {
    var pool = connection.getpool();

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err: any, connection: any) {
            if (err) {
                reject(err);
            }

            var query = `update technique set 
            t_title = ?,
            t_description = ?,
            t_grade = ?,
            t_set = ?
            where t_id = ?;`;

            connection.query(query, [technique.t_title, technique.t_description, technique.t_grade, technique.t_set, technique.t_id], function (error: any, results: any, fields: any) {
                connection.release();

                if (error) {
                    reject(error);
                }

                resolve(results);
            });
        });
    });
};

function updateTechniqueSet(techniqueSet: TechniqueGroupDataModel) {
    var pool = connection.getpool();

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err: any, connection: any) {
            if (err) {
                reject(err);
            }

            var query = `update technique_set set 
            name = ?
            where id = ?;`;

            connection.query(query, [techniqueSet.name, techniqueSet.id], function (error: any, results: any, fields: any) {
                connection.release();

                if (error) {
                    reject(error);
                }

                resolve(results);
            });
        });
    });
};

function deactivateTechniqueSet(techniqueSetID: number) {
    var pool = connection.getpool();

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err: any, connection: any) {
            if (err) {
                reject(err);
            }

            var query = `update technique_set set
            active = FALSE
            where id = ?;`;

            connection.query(query, [techniqueSetID], function (error: any, results: any, fields: any) {
                connection.release();

                if (error) {
                    reject(error);
                }

                resolve(results);
            });
        });
    });
};



function getAllTechniqueSets() {
    var pool = connection.getpool();

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err: any, connection: any) {
            if (err) {
                reject(err);
            }
            var query = 'select * from technique_set where active = TRUE;';

            connection.query(query, function (error: any, results: any, fields: any) {
                connection.release();

                if (error) {
                    reject(error);
                }

                resolve(results);
            });
        });
    });
};

function addTechniqueSet(techniqueSetName: string) {
    var pool = connection.getpool();

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err: any, connection: any) {
            if (err) {
                reject(err);
            }

            var query = 'INSERT INTO technique_set (' + techniqueSetColumns +  ') VALUES(?, ?);';

            connection.query(query, [0, techniqueSetName], function (error: any, results: any, fields: any) {
                connection.release();

                if (error) {
                    reject(error);
                }

                if(results){
                    resolve(results.insertId);

                }

                resolve(results);


            });
        });
    });
};

function getAllTechniques() {
    var pool = connection.getpool();

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err: any, connection: any) {
            if (err) {
                reject(err);
            }

            var query = 'select * from technique;';

            connection.query(query, function (error: any, results: any, fields: any) {
                connection.release();

                if (error) {
                    reject(error);
                }

                resolve(results);
            });
        });
    });
};

function updateTags(t_id: number, tag_id: number) {
    var pool = connection.getpool();

     return removeTags(t_id).then(() => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function(err: any, connection: any) {
                if (err) {
                    reject(err);
                }

                var query = 'INSERT INTO technique_tag (t_id, tag_id) VALUES(?, ?);';

                connection.query(query, [t_id, tag_id], function (error: any, results: any, fields: any) {
                    connection.release();

                    if (error) {
                        reject(error);
                    }

                    resolve(results);
                });
            });
        });
    });

};

function removeTags(t_id: number) {
    var pool = connection.getpool();

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err: any, connection: any) {
            if (err) {
                reject(err);
            }

            var query = 'DELETE from technique_tag where t_id = ?;';

            connection.query(query, [t_id], function (error: any, results: any, fields: any) {
                connection.release();

                if (error) {
                    reject(error);
                }

                resolve(results);
            });
        });
    });
};

function getTechniqueTags() {
    var pool = connection.getpool();

    return new Promise((resolve, reject) => {
        pool.getConnection(function(err: any, connection: any) {
            if (err) {
                reject(err);
            }

            var query = 'select * from technique_tag;';

            connection.query(query, function (error: any, results: any, fields: any) {
                connection.release();

                if (error) {
                    reject(error);
                }

                resolve(results);
            });
        });
    });
};

module.exports = {
    createTechnique: createTechnique,
    getAllTechniques: getAllTechniques,
    getAllTechniqueSets: getAllTechniqueSets,
    addTechniqueSet: addTechniqueSet,
    updateTechnique: updateTechnique,
    updateTechniqueSet: updateTechniqueSet,
    updateTags: updateTags,
    getTechniqueTags: getTechniqueTags,
    deactivateTechniqueSet: deactivateTechniqueSet,
    removeTags: removeTags

};
