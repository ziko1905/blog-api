const express = require("express");
const app = express();
const routes = require("./routes");
const passport = require("passport");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/passport");

app.use(cors());
app.use("/", routes.authRouter);
app.use("/users", routes.userRouter);
app.use("/posts", routes.postRouter);

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app listening on port: ${PORT}.`);
});
