const express = require("express");
const app = express();
const routes = require("./routes");
const queries = require("./db/queries");
const passport = require("passport");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/passport");
app.use(passport.authenticate("jwt", { session: false }));

app.use("/", routes.authRouter);
app.use("/users", routes.userRouter);
app.use("/posts", routes.postRouter);

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({ msg: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app listening on port: ${PORT}.`);
});
