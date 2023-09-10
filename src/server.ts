import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";


import mainRoute from "./mainRoute";
import connectToMongo from "./utils/init.mongo";

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
app.use("/api", mainRoute);

const main = async () => {
  try {
    await connectToMongo();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

main();



const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
