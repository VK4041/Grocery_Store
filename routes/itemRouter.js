const { Router } = require("express");
const itemController = require("../controllers/itemController");
const itemRouter = Router();

itemRouter.get("/:id", itemController.getItem);
itemRouter.get("/create/:catId", itemController.createItemForm);
itemRouter.post("/create/:catId", itemController.createItem);

module.exports = itemRouter;
