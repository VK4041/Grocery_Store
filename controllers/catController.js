const catQueries = require("../db/queries/categories");
const itemQuries = require("../db/queries/items");
module.exports = {
  getCatItems: async (req, res) => {
    const catId = req.params.id;
    //Get items for that category
    const catItems = await itemQuries.getCatItems(catId);
    const catName = await catQueries.getCatName(catId);
    res.render("items", {
      title: catName,
      items: catItems,
    });
  },
};
