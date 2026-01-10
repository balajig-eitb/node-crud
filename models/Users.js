import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Users = sequelize.define(
    "Users",{
            id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        user_name: { 
            type : DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        created_at: DataTypes.TIME,
        active: DataTypes.BOOLEAN,
        role: DataTypes.STRING,
        permission: DataTypes.JSON,
    },
    {
        timestamps: false,  
        tableName: 'users', 
    }
    
);

export default Users;