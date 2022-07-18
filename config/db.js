import sequelize from "sequelize";

const db = new sequelize("aaa","root","",{
    host: "localhost",
    dialect: "mysql"
});

export default db;
