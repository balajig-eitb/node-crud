import express from "express";
import { createUser,  getUsers, getUserById, logIn } from "../services/usersService.js";

const router = express.Router();

router.get("/get-users", async (req, res) => {

   try {
        const users = await getUsers();
        
        res.status(200).json({ data : users});
        
    } catch (error) {
         res.status(500).json({ message : error.message});
        }     
});

router.get("/get-user/:id", async (req, res) => {
   try {
        const { id } = req.params;

        const roles = await getUserById(id);
        
        res.status(200).json({ data : roles});
        
    } catch (error) {
         res.status(500).json({ message : error.message});
        }     
});

router.post("/create-user", async (req, res) => {

    try {
        if(!req.body.name || !req.body.user_name || !req.body.password)
        {
            res.status(409).json({"message" : "required field missing"});
        }

        const roles = await createUser(req.body);
        
        if(roles){
            res.status(200).json({ data : roles});
        }
        
    }catch (error) {
         res.status(500).json({ message : error.message});
    }     
});


router.post("/login", async (req, res)=>{

    try{
        const user = await logIn(req.body.user_name, req.body.password);

        return res.status(200).json({"data" : user});

    }catch(error)
    {
            return res.status(500).json({"message" : error.message});

    }
});


export default router;