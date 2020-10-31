module.exports = {
    "type": "mysql",
    "host": process.env.RDS_HOSTNAME,
    "username": process.env.RDS_USERNAME,
    "password": process.env.RDS_PASSWORD,
    "database": process.env.DATABASE,
    "entities": [process.env.ENTITY],
    "logging": true,
    "cache": true,
    "synchronize": false,
    "migrations": ["migration/*.ts"],
    "cli": {
        "migrationsDir": "migration"
    }
}

