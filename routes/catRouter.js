const { Router } = require("express");
const catController = require("../controllers/catController");
const catRouter = Router();

catRouter.get("/create", catController.createCatForm);
catRouter.post("/create", catController.createCat);
catRouter.get("/:id", catController.getCatItems);
catRouter.get("/update/:cat_id", catController.updateCatForm);
catRouter.post("/update/:cat_id", catController.updateCat);

module.exports = catRouter;
