import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());

const PORT = 4000;
app.get("/", (req, res) => {
  res.send("Hello Ghareeb Nawaz");
});

app.listen(PORT, () => {
  console.log(`Server is running at localhost://${PORT}`);
});
