import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import testRoute from  "./routes/testRoute.js";
import rolesRoute from "./routes/rolesRoutes.js";
import userRoute from "./routes/usersRoutes.js";

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

import session from "express-session";
import passport from "passport";
import { configureGoogleSSO } from "./modules/google/googleAuth.js";
import authRoutes from "./routes/authRoutes.js";



const app = express()

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(bodyParser.json());

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

// app.use("/api/auth", authRoutes);
// app.use("/api", routeCandidate);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/api", testRoute);
app.use("/api/roles", rolesRoute);
app.use("/api/users", userRoute);
app.use("/auth", authRoutes);



app.listen(5000, () => console.log("server running on port 5000"));

