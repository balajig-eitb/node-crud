import  db  from "../db.js";


export const createUser = async(data) =>{
    const [result] = await db.execute('insert into users (email,password) values (?,?)',[data.email, data.password]);
    return result;

    //return res.json({ message: "User registerd successfully"});
}

//export const getCandidateById = async(id) => {
export const getUserByEmail = async(email) => {

    const [rows] = await db.execute("select * from users where email = ?", [email]);

    return rows.length > 0 ? rows[0] : null;

}