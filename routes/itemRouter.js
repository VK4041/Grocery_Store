const { Router } = require("express");
const itemController = require("../controllers/itemController");
const itemRouter = Router();

itemRouter.get("/:id", itemController.getItem);

module.exports = itemRouter;
