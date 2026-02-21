import express from "express";
import { createCandidate, getCandidate, updateCandidate } from "../services/candidateService.js";

//import { db } from "../db.js";

const router = express.Router();


router.get("/get-candidates", async (req, res) => {
/**
 * @swagger
 * /api/get-candidates:
 *   get:
 *     tags:
 *       - Candidates
 *     summary: Get all candidates
 *     responses:
 *       200:
 *         description: List of candidates
 */
   try {
        const candidate = await getCandidate();
        
        res.status(200).json({ data : candidate});
        
    } catch (error) {
         res.status(500).json({ message : error.message});
        }     
});

/**
 * @swagger
 * /api/get-candidates/{id}:
 *   get:
 *     tags:
 *       - Candidates
 *     summary: Fetch candidate using id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Candidates details
 */
router.get("/get-candidates/{id}", async (req, res) => {

   try {
        const candidate = await getCandidate();
        
        res.status(200).json({ data : candidate});
        
    } catch (error) {
         res.status(500).json({ message : error.message});
        }     
});


/**
 * @swagger
 * /api/create-candidate:
 *   post:
 *     tags:
 *       - Candidates
 *     summary: Create a new candidates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - phone
 *               - role
 *               - job_role
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: "+91-9876543210"
 *               location:
 *                 type: string
 *                 example: Bangalore
 *               role:
 *                 type: string
 *                 example: Candidate
 *               job_role:
 *                 type: string
 *                 example: Frontend Developer
 *               current_company:
 *                 type: string
 *                 example: ABC Technologies
 *               education:
 *                 type: string
 *                 example: B.Tech Computer Science
 *               experience:
 *                 type: number
 *                 example: 4
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Vue.js", "Nuxt", "JavaScript"]
 *               linkedin:
 *                 type: string
 *                 example: https://linkedin.com/in/johndoe
 *               portfolio:
 *                 type: string
 *                 example: https://johndoe.dev
 *               notice_period:
 *                 type: number
 *                 example: 30
 *               expected_salary:
 *                 type: number
 *                 example: 1200000
 *     responses:
 *       201:
 *         description: Candidate created successfully
 */
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


/**
 * @swagger
 * /api/update-candidate:
 *   post:
 *     tags:
 *       - Candidates
 *     summary: Create a new candidates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - firstname
 *               - lastname
 *               - email
 *               - phone
 *               - role
 *               - job_role
 *             properties:
 *               id:
 *                 type: string
 *                 example: abcd123ef  
 *               firstname:
 *                 type: string
 *                 example: John
 *               lastname:
 *                 type: string
 *                 example: Doe
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: "+91-9876543210"
 *               location:
 *                 type: string
 *                 example: Bangalore
 *               role:
 *                 type: string
 *                 example: Candidate
 *               job_role:
 *                 type: string
 *                 example: Frontend Developer
 *               current_company:
 *                 type: string
 *                 example: ABC Technologies
 *               education:
 *                 type: string
 *                 example: B.Tech Computer Science
 *               experience:
 *                 type: number
 *                 example: 4
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Vue.js", "Nuxt", "JavaScript"]
 *               linkedin:
 *                 type: string
 *                 example: https://linkedin.com/in/johndoe
 *               portfolio:
 *                 type: string
 *                 example: https://johndoe.dev
 *               notice_period:
 *                 type: number
 *                 example: 30
 *               expected_salary:
 *                 type: number
 *                 example: 1200000
 *     responses:
 *       201:
 *         description: Candidate created successfully
 */
router.post("/update-candidate", async (req, res) => {

    try {
        const candidate = await updateCandidate(req.body);
        
        res.status(200).json({ data : candidate});
        
    }catch (error) {
         res.status(500).json({ message : error.message});
    }     
})


export default router;