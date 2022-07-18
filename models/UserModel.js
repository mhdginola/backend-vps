import sequelize from "sequelize";
import db from "../config/db.js";

const {DataTypes} = sequelize;

const user = db.define('user',{
    name: {
        type:DataTypes.STRING,
        primaryKey:true
    },
    password: DataTypes.STRING
},
{
    freezeTableName: true
})

export default user;

(async()=>{
    await db.sync();
})();