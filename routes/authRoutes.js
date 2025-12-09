import express, { response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getUserByEmail,createUser } from "../models/userModel.js";


const router = express.Router();

const users = [];

router.post("/register", async (req, res) => {

    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({ message: "Need email and password"});
    }


    const hash = await bcrypt.hash(password, 10);
    console.log(hash);
    const user = await createUser({ email, password: hash});

    //users.push({ email, password: hash});

    res.json({ message : "User registerd", data : user});

})



router.post("/login", async (req, res) => {

    const { email, password} = req.body;

    //const user = users.find((u) => u.email === email);
    const user = await getUserByEmail(email);
    if(!user) return res.status(400).json({ message: "User not found"});
    //console.log(user);
    const vaild = await bcrypt.compare(password, user.password);
    if(!vaild) return res.status(400).json({ message : "Invalid password"});

    //console.log(process.env.JWT_SECRET);

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
        );


    res.json({ token });  
});


router.post("/getuserbyemail", async(req, res) => {

    const { email } = req.body;

    const result = await getUserByEmail(email);
    

    return res.status(200).json({data: result});

});

export default router;


