var connection = require('../db/rdsconnect');
var _ = require('underscore');

var gradeColumns = "grade_id, short_name, long_name, css_class";

var grades = [
    {
        id: 0,
        shortName: "Wh",
        longName: "White",
        cssClass: "white"
    },
    {
        id: 1,
        shortName: "Y1",
        longName: "Yellow 1",
        cssClass: "yellow"

    },
    {
        id: 2,
        shortName: "Y2",
        longName: "Yellow 2",
        cssClass: "yellow"
    },
    {
        id: 3,
        shortName: "Y3",
        longName: "Yellow 3",
        cssClass: "yellow"
    },
    {
        id: 4,
        shortName: "B1",
        longName: "Blue 1",
        cssClass: "blue"
    },
    {
        id: 5,
        shortName: "B2",
        longName: "Blue 2",
        cssClass: "blue"
    },
    {
        id: 6,
        shortName: "B3",
        longName: "Blue 3",
        cssClass: "blue"
    },
    {
        id: 7,
        shortName: "R1",
        longName: "Red 1",
        cssClass: "red"
    },
    {
        id: 8,
        shortName: "R2",
        longName: "Red 2",
        cssClass: "red"
    },
    {
        id: 9,
        shortName: "R3",
        longName: "Red 3",
        cssClass: "red"
    },
    {
        id: 10,
        shortName: "1D",
        longName: "1st Dan",
        cssClass: "black"
    },
    {
        id: 11,
        shortName: "2D",
        longName: "2nd Dan",
        cssClass: "black"
    },
    {
        id: 12,
        shortName: "3D",
        longName: "3rd Dan",
        cssClass: "black"
    },
    {
        id: 13,
        shortName: "4D",
        longName: "4th Dan",
        cssClass: "black"
    },
    {
        id: 14,
        shortName: "5D",
        longName: "5th Dan",
        cssClass: "black"
    },
    {
        id: 15,
        shortName: "6D",
        longName: "6th Dan",
        cssClass: "black"
    },
    {
        id: 16,
        shortName: "7D",
        longName: "7th Dan",
        cssClass: "black"
    },
    {
        id: 17,
        shortName: "8D",
        longName: "8th Dan",
        cssClass: "black"
    },
    {
        id: 18,
        shortName: "9D",
        longName: "9th Dan",
        cssClass: "black"
    }];


function createAllGrades () {
    return new Promise((resolve, reject) => {
        var promises = [];

        _.each(grades, (grade)=> {
            promises.push(createGrade(grade.id, grade.shortName, grade.longName, grade.cssClass));
        });

        Promise.all(promises).then((result) => {
            // console.log('blarg');
            resolve();
        }).catch((err) => {
            reject(err);
        });
    });

};

function createGrade(id, sn, ln, css) {
    var pool = connection.getpool();

    return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (!connection) {
                    reject(err);
                }

                var q = "insert into grade ("+ gradeColumns  +") values (?, ?, ?, ?);";

                connection.query(q, [id, sn, ln, css], function (error, results, fields) {
                    connection.release();

                    /*if (error) {
                        reject(error);
                    }

                    if(results !== undefined && results.affectedRows === 0){
                        reject('Grade already exists');
                    }*/

                    resolve(results);
                });
            });
        });
}

module.exports = {
    createAllGrades: createAllGrades,
};
