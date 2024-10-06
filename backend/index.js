const express = require("express");
const cors = require("cors");
app.use(cors());

const rootRouter = require("./routes/index");
const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(port);