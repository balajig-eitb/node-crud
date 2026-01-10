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

const app = express()

app.use(cors());
app.use(bodyParser.json());

// app.use("/api/auth", authRoutes);
// app.use("/api", routeCandidate);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/api", testRoute);
app.use("/api/roles", rolesRoute);
app.use("/api/users", userRoute);



app.listen(5000, () => console.log("server running on port 5000"));

