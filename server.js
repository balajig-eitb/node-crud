import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import routeCandidate from "./routes/candidateRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
import testRoute from  "./routes/testRoute.js";

const app = express()

app.use(cors());
app.use(bodyParser.json());

// app.use("/api/auth", authRoutes);
// app.use("/api", routeCandidate);

app.use("/api", testRoute);

app.listen(5000, () => console.log("server running on port 5000"));

