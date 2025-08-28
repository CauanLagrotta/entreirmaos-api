import express from "express";
import cors from "cors";
import { router } from "./http/routes/routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(router);

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
