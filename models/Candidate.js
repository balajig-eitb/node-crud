import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Candidate = sequelize.define(
  "Candidate",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    location: DataTypes.STRING,
    role: DataTypes.STRING,
    job_role: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    current_company: DataTypes.STRING,
    education: DataTypes.STRING,
    skills: DataTypes.JSON, // array stored as JSON
    linkedin: DataTypes.STRING,
    portfolio: DataTypes.STRING,
    // github_url: DataTypes.STRING,
    notice_period: DataTypes.STRING,
    expected_salary: DataTypes.STRING,
  },
  {
    tableName: "candidates",
    timestamps: false,
  }
);

export default Candidate;
