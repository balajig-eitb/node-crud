import express from "express";
import { createRole,  getRoles, getRoleById } from "../services/rolesService.js";

const router = express.Router();

router.get("/get-roles", async (req, res) => {

   try {
        const roles = await getRoles();
        
        res.status(200).json({ data : roles});
        
    } catch (error) {
         res.status(500).json({ message : error.message});
        }     
});

router.get("/get-roles/:id", async (req, res) => {
   try {
        const { id } = req.params;

        const roles = await getRoleById(id);
        
        res.status(200).json({ data : roles});
        
    } catch (error) {
         res.status(500).json({ message : error.message});
        }     
});

router.post("/create-roles", async (req, res) => {

    try {
        const roles = await createRole(req.body);
        
        if(roles){
            res.status(200).json({ data : roles});
        }
        
    }catch (error) {
         res.status(500).json({ message : error.message});
    }     
})


export default router;