const catQueries = require("../db/queries/categories");
const itemQueries = require("../db/queries/items");
const { emptyToNull } = require("./helper");

module.exports = {
  getItem: async (req, res) => {
    const itemId = req.params.id;
    //Get the item's details
    const { item_id, item_name, item_desc, item_price, item_stock, cat_id } =
      await itemQueries.getItem(itemId);
    res.render("item", {
      title: item_name.at(0).toUpperCase().concat(item_name.slice(1)),
      desc: item_desc,
      price: item_price,
      stock: item_stock,
      itemId: item_id,
      cat_id,
    });
  },
  createItemForm: (req, res) => {
    const cat_id = req.params.cat_id;
    res.render("create/createItem", { title: "Add new item", cat_id });
  },
  createItem: async (req, res) => {
    const cat_id = req.params.cat_id;
    const item = { ...req.body, cat_id };
    emptyToNull(item);
    await itemQueries.createNewItem(item);
    res.redirect(`/cat/${cat_id}`);
  },
  updateItemForm: async (req, res) => {
    const cats = await catQueries.getAllCategories();
    const item = await itemQueries.getItem(req.params.itemId);
    res.render("update/updateItem", { title: "Update Item", cats, item });
  },
  updateItem: async (req, res) => {
    const itemId = req.params.itemId;
    emptyToNull(req.body);
    const itemCatId =
      req.body.itemCatName === "Uncategorized"
        ? null
        : await catQueries.getCatIdByName(req.body.itemCatName);
    const item = Object.assign({}, { itemCatId, itemId }, { ...req.body });
    await itemQueries.updateItem(item);
    res.redirect(`/item/${item.itemId}`);
  },
  confirmDelete: (req, res) => {
    const itemId = req.params.itemId;
    res.render("delete/confirmDelete", { type: "item", id: itemId });
  },
  deleteItem: async (req, res) => {
    const itemId = req.params.itemId;
    const { item_name, cat_id } = await itemQueries.getItem(itemId);
    await itemQueries.deleteItem(itemId);
    console.log(`Item "${item_name}" was deleted`);
    res.redirect(`/cat/${cat_id}`);
  },
};
