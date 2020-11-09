module.exports = {
    "type": "mysql",
    "host": process.env.RDS_HOSTNAME,
    "username": process.env.RDS_USERNAME,
    "password": process.env.RDS_PASSWORD,
    "database": process.env.DATABASE,
    "entities": [process.env.ENTITY],
    "logging": false,
    "cache": true,
    "keepConnectionAlive": true,
    "synchronize": false,
    "migrations": [process.env.MIGRATIONS],
    "cli": {
        "migrationsDir": "migration"
    }
}
