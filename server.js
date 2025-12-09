import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routeCandidate from "./routes/candidateRoutes.js";

const app = express()

app.use(cors());
app.use(bodyParser.json());

app.use("/api", routeCandidate);

app.listen(5000, () => console.log("server runnign on port 5000"));

