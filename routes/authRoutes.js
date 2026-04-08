import express, { response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { getUserByEmail,createUser } from "../models/userModel.js";
import passport from "passport";
const router = express.Router();



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

// Step 1 → redirect to Google Login
router.get("/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
  })
);

// Step 2 → Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  (req, res) => {
    res.send(`
      <script>
        window.opener.postMessage(
          { type: "GOOGLE_LOGIN_SUCCESS" },
          "http://localhost:3000"
        );
        window.close();
      </script>
    `);
  }
);

// Login failed
router.get("/failed", (req, res) => {
  res.send(`
    <script>
      window.opener.postMessage(
        { type: "GOOGLE_LOGIN_FAILED" },
        "http://localhost:3000"
      );
      window.close();
    </script>
  `);
});

// Logout route
router.get("/logout", (req, res, next) => {
  if (!req.user) {
    return res.send("No user logged in.");
  }

  req.logout(function(err) {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.send("Logged out successfully.");
    });
  });
});

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      authenticated: true,
      user: req.user,
    });
  }
  res.json({ authenticated: false });
});

export default router;


