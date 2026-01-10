import { now } from "sequelize/lib/utils";
import Roles from "../models/Roles.js";
import { generateRefId } from "../utils/refId.js";
import { UniqueConstraintError } from "sequelize";

export const createRole = async (data) => {
   // console.log(data);

   try{
    const roles = await Roles.create({
    name : data.name,
    code : data.code,
    description: data.description,
    active: 1,
  });

  return roles;

  }catch(error){

    if(error instanceof UniqueConstraintError) {
        const err = new Error('Role code already exists');
        err.status = 409;
        err.field = 'code';
        throw err;
    }

    throw error;
  }
};

export const getRoles = async (data) => {

    const roles = await Roles.findAll({order: [['created_at', 'DESC']]});
    return roles;

};


export const getRoleById = async (id) => {

    const roles = await Roles.findByPk(id);
    return roles;

};
