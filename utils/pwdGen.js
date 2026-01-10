import bcrypt from 'bcryptjs';

export const generatePassword = async (password) => {
  
  const saltRounds = 10;
  const pass = password ?? "EiTB@2026";

  const hashpwd =  await bcrypt.hash(pass, saltRounds);

  return hashpwd;

};
