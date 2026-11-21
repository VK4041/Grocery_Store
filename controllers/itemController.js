const catQueries = require("../db/queries/categories");
const itemQueries = require("../db/queries/items");

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
    await itemQueries.createNewItem(item);
    res.redirect(`/cat/${cat_id}`);
  },
  updateItemForm: async (req, res) => {
    const cats = await catQueries.getAllCategories();
    const item = await itemQueries.getItem(req.params.itemId);
    res.render("update/updateItem", { title: "Update Item", cats, item });
  },
  updateItem: async (req, res) => {
    const itemCatId = await catQueries.getCatIdByName(req.body.itemCatName);
    const item = Object.assign({}, { itemCatId }, { ...req.body });
    await itemQueries.updateItem(item);
    res.redirect(`/item/${item.itemId}`);
  },
};
