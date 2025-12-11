import express from "express";
import { createCandidate, getCandidate } from "../services/candidateService.js";

//import { db } from "../db.js";

const router = express.Router();


router.get("/get-candidates", async (req, res) => {

   try {
        const candidate = await getCandidate();
        
        res.status(200).json({ data : candidate});
        
    } catch (error) {
         res.status(500).json({ message : error.message});
        }     
});

router.get("/get-candidates/{id}", async (req, res) => {

   try {
        const candidate = await getCandidate();
        
        res.status(200).json({ data : candidate});
        
    } catch (error) {
         res.status(500).json({ message : error.message});
        }     
});

router.post("/create-candidate", async (req, res) => {

    try {
        const candidate = await createCandidate(req.body);
        
        res.status(200).json({ data : candidate});
        
    }catch (error) {
         res.status(500).json({ message : error.message});
    }     
})



router.get("/get-candidate-by-id", async (req, res) => {

    try {
        const candidate = await getCandidateById(req.body.id);
        
        res.status(200).json({ data : candidate});
        
    }catch (error) {
         res.status(500).json({ message : error.message});
    }     
})




export default router;