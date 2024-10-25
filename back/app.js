const express = require("express");
const app = express();
const routes = require("./routers");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));

app.use("/", routes.authRouter);
app.use("/users", routes.userRouter);
app.use("/posts", routes.postRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app listening on port: ${PORT}.`);
});
