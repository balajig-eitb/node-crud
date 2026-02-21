import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Roles = sequelize.define(
    "Roles",{
        id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    code: {
      type : DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    created_at: DataTypes.TIME,
    active: DataTypes.BOOLEAN,
    },
    {
      timestamps: false,  
      tableName: 'roles', 
    }
)

export default Roles;
