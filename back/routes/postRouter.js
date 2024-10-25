const { Router } = require("express");
const commentRouter = require("./commentRouter");
const queries = require("../db/queries");
const router = Router();

router.get("/");
