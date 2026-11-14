const catQueries = require("../db/queries/categories");

module.exports = {
  getCategories: async (req, res) => {
    const categories = await catQueries.getAllCategories();
    res.render("index", {
      title: "Grocery Inventory",
      categories,
    });
  },
};
