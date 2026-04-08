// app.js

import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import { configureGoogleSSO } from "./modules/google/googleAuth.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Session (passport needs this)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,      // true only in HTTPS
      sameSite: "lax"     // or "none" if needed
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Setup Google SSO module
configureGoogleSSO();

// Register auth routes
app.use("/", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Start server
// app.listen(3000, () => console.log("Server running on http://localhost:3000"));
