import bcrypt from 'bcryptjs';

export const checkPassword = async (password, hash) => {
  
  const hashpwd =  await bcrypt.compare(password, hash);
  return hashpwd;

};
