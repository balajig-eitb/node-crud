import { now } from "sequelize/lib/utils";
import Users from "../models/Users.js";
import { generatePassword } from "../utils/pwdGen.js";
import { checkPassword } from "../utils/verifyPwd.js"
import { UniqueConstraintError } from "sequelize";

export const createUser = async (data) => {
   console.log(data);
  
   const hashedPassword = await generatePassword(data.password ?? "EiTB@2026");
   console.log(hashedPassword);
   try{
      const user = await Users.create({
      name : data.name,
      password : hashedPassword,
      user_name :  data.user_name,
      role : data.role,
      active: 1,
  });

  return user;

  }catch(error){

    if(error instanceof UniqueConstraintError) {
        const err = new Error('Username already exists');
        err.status = 409;
        err.field = 'user_name';
        throw err;
    }

    throw error;
  }
};

export const getUsers = async (data) => {

    const users = await Users.findAll({order: [['created_at', 'DESC']]});
    return users;

};


export const getUserById = async (id) => {

    const user = await Users.findByPk(id);
    return user;

};


export const logIn = async(user_name, password) =>{

  const user = await Users.findOne(
    {
     // attributes : ['id','name','password','active'],
      where: {user_name: user_name}
    });
  
  if(!user)
  {
    return {"message" : "No user found"};
  }

  const flag = await checkPassword(password, user.password);

  if(flag)
  {
    return user;
  }
   
    return {"message" : "Invalid credentials"};
}