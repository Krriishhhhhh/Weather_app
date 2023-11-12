import express from "express";
import cors from 'cors'
import userRoutes from "./routes/user";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRoutes);

app.listen(5001, () => {
  console.log("Backend Server is on on port number 5001");
});
