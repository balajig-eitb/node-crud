import express from "express";
import { createUser,  getUsers, getUserById, logIn, updateUser, activeToggle } from "../services/usersService.js";

const router = express.Router();

router.get("/get-users", async (req, res) => {
    /**
     * @swagger
     * /api/users/get-users:
     *   get:
     *     tags:
     *          - Users
     *     summary: Get all users
     *     responses:
     *       200:
     *         description: List of users
     */
   try {
        const users = await getUsers();
        
        res.status(200).json({ data : users});
        
    } catch (error) {
         res.status(500).json({ message : error.message});
        }     
});

/**
 * @swagger
 * /api/users/get-user/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Fetch user using id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 */
router.get("/get-user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const roles = await getUserById(id);
    res.status(200).json({ data: roles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/**
 * @swagger
 * /api/users/create-user:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - user_name
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John
 *               user_name:
 *                 type: string
 *                 example: admin1
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       201:
 *         description: User created successfully
 */
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


/**
 * @swagger
 * /api/users/update-user:
 *   post:
 *     tags:
 *       - Users
 *     summary: update user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - email
 *               - user_name
 *               - password
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 0
 *               name:
 *                 type: string
 *                 example: John
 *               user_name:
 *                 type: string
 *                 example: admin1
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       201:
 *         description: User updated successfully
 */
// router.post("/update-user/:id", async (req, res) => {
//     console.log(req.body);
//     try {
//         if(!req.body.name || !req.body.user_name || !req.body.password || !req.body.id)
//         {
//             return res.status(409).json({"message" : "required field missing"});
//         }

//         const user = await updateUser(req.body);
        
//         if(user){
//            return res.status(200).json({ data : user});
//         }
        
//     }catch (error) {
//         res.status(500).json({ message : error.message});
//     }     
// });

router.put("/update-user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedUser = await updateUser(id, req.body);;

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: updatedUser });

  } catch (error) {
    res.status(500).json({ message: error.message });
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




/**
 * @swagger
 * /api/users/status-toggle:
 *   post:
 *     tags:
 *       - Users
 *     summary: update user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       201:
 *         description: User updated successfully
 */
router.post("/status-toggle", async (req, res) => {
    console.log(req.body);
    try {
        if(!req.body.id)
        {
            return res.status(409).json({"message" : "required field missing"});
        }

        const user = await activeToggle(req.body);
        
        if(user){
           return res.status(200).json({ data : user});
        }
        
    }catch (error) {
        res.status(500).json({ message : error.message});
    }     
});

export default router;