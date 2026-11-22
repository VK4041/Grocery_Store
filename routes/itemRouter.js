const { Router } = require("express");
const itemController = require("../controllers/itemController");
const itemRouter = Router();

itemRouter.get("/:id", itemController.getItem);
itemRouter.get("/create/:cat_id", itemController.createItemForm);
itemRouter.post("/create/:cat_id", itemController.createItem);
itemRouter.get("/update/:itemId", itemController.updateItemForm);
itemRouter.post("/update/:itemId", itemController.updateItem);
itemRouter.get("/delete/:itemId", itemController.confirmDelete);
itemRouter.post("/delete/:itemId", itemController.deleteItem);

module.exports = itemRouter;
