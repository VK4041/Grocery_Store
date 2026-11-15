const { Router } = require("express");
const catController = require("../controllers/catController");
const catRouter = Router();

catRouter.get("/create", catController.createCatForm);
catRouter.post("/create", catController.createCat);
catRouter.get("/:id", catController.getCatItems);

module.exports = catRouter;
