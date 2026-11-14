const { Router } = require("express");
const catController = require("../controllers/catController");
const catRouter = Router();

catRouter.get("/:id", catController.getCatItems);

module.exports = catRouter;
