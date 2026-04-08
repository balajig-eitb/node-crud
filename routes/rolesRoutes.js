import express from "express";
import { createRole,  getRoles, getRoleById, updateRole } from "../services/rolesService.js";

const router = express.Router();

/**
 * @swagger
 * /api/roles/get-roles:
 *   get:
 *     tags:
 *       - Roles
 *     summary: update user
 *     responses:
 *       200:
 *         description: get all responses
 */
router.get("/get-roles", async (req, res) => {

   try {
        const roles = await getRoles();
        
        res.status(200).json({ data : roles});
        
    } catch (error) {
         res.status(500).json({ message : error.message});
        }     
});


/**
 * @swagger
 * /api/roles/get-roles/{id}:
 *   get:
 *     tags:
 *       - Roles
 *     summary: Fetch user using id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Role details
 */
router.get("/get-roles/:id", async (req, res) => {
   try {
        const { id } = req.params;

        const roles = await getRoleById(id);
        
        res.status(200).json({ data : roles});
        
    } catch (error) {
         res.status(500).json({ message : error.message});
        }     
});


/**
 * @swagger
 * /api/roles/create-roles:
 *   post:
 *     tags:
 *       - Roles
 *     summary: Create a new role
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: Tech Lead
 *               code:
 *                 type: string
 *                 example: TL1
 *               description:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       201:
 *         description: User created successfully
 */
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

router.put("/update-role/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRole = await updateRole(id, req.body);

    if (!updatedRole) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.status(200).json({ data: updatedRole });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;