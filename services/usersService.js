import { now } from "sequelize/lib/utils";
import Users from "../models/Users.js";
import { generatePassword } from "../utils/pwdGen.js";
import { checkPassword } from "../utils/verifyPwd.js"
import { UniqueConstraintError } from "sequelize";

export const createUser = async (data) => {
  // console.log(data);
  
   const hashedPassword = await generatePassword(data.password ?? "EiTB@2026");
   //console.log(hashedPassword);
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



// export const updateUser = async(data)  => {

//   let user = await  Users.findByPk(data.id);

//   if(!user){

//     return {"message" : "No user found"};

//   }

//    const hashedPassword = await generatePassword(data.password ?? "EiTB@2026");
//    //console.log(hashedPassword);
//     try{
//         const [affectedRows] = await Users.update(
//       {
//         name: data.name,
//         password: hashedPassword,
//         user_name: data.user_name,
//         role: data.role,
//       },
//       {
//         where: { id: data.id }
//       }
//     );

//     if (affectedRows === 0) {
//       return null; // user not found
//     }

//     return { message: "Updated successfully" };
   
//   }catch(error){

//     if(error instanceof UniqueConstraintError) {
//         const err = new Error('Username already exists');
//         err.status = 409;
//         err.field = 'user_name';
//         throw err;
//     }

//     throw error;
//   }
// }

export const updateUser = async (id, data) => {
  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return null; // caller decides 404
    }

    const name = `${data.name ?? user.name ?? ""}`.trim();

    await user.update({
      name: name,
      code: data.code ?? user.code,
      description: data.description ?? user.description,
      
    });

    return user;

  } catch (error) {
    throw error;
  }
};


export const activeToggle = async (data) => {
  try {
    const user = await Users.findByPk(data.id);

    if (!user) {
      return { status: "NOT_FOUND", message: "No user found" };
    }

    await user.update({
      active: !user.active
    });

    return {
      status: "OK",
      message: "Updated successfully",
      active: user.active
    };

  } catch (error) {
    throw error;
  }
};