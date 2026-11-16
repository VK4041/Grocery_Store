const catQueries = require("../db/queries/categories");
const itemQueries = require("../db/queries/items");

module.exports = {
  getItem: async (req, res) => {
    const itemId = req.params.id;
    //Get the item's details
    const { item_id, item_name, item_desc, item_price, item_stock } =
      await itemQueries.getItem(itemId);
    res.render("item", {
      title: item_name.at(0).toUpperCase().concat(item_name.slice(1)),
      desc: item_desc,
      price: item_price,
      stock: item_stock,
      id: item_id,
    });
  },
  createItemForm: (req, res) => {
    const catId = req.params.catId;
    res.render("create/createItem", { title: "Add new item", catId });
  },
  createItem: async (req, res) => {
    const catId = req.params.catId;
    const item = { ...req.body, catId };
    await itemQueries.createNewItem(item);
    res.redirect(`/cat/${catId}`);
  },
};
