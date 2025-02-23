import express from "express"
import cors from "cors"
import router from "./routes";

const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())

app.use("/api/v1", router)

app.listen(port,()=> console.log(`Server Started at port ${port}.`))