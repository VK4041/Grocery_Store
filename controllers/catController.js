const catQueries = require("../db/queries/categories");
const itemQueries = require("../db/queries/items");

module.exports = {
  getCatItems: async (req, res) => {
    const cat_id = req.params.id;
    //Get items for that category
    const catItems = await itemQueries.getCatItems(cat_id);
    const { name, description } = await catQueries.getCatDetails(cat_id);
    res.render("catItems", {
      title: name.at(0).toUpperCase().concat(name.slice(1)),
      items: catItems[0],
      numItems: catItems[1],
      catDesc: description,
      cat_id,
    });
  },
  createCatForm: (req, res) => {
    res.render("create/createCat", { title: "Create New Category" });
  },
  createCat: async (req, res) => {
    await catQueries.createNewCat(req.body);
    res.redirect("/");
  },
  updateCatForm: async (req, res) => {
    const cat_id = req.params.cat_id;
    const { name, description } = await catQueries.getCatDetails(cat_id);
    res.render("update/updateCat", {
      title: "Update Category",
      cat_id,
      name,
      description,
    });
  },
  updateCat: async (req, res) => {
    const cat = req.body;
    await catQueries.updateCat(req.body);
    console.log(`Category "${cat.catName}" was updated`);
    res.redirect(`/cat/${cat.cat_id}`);
  },
};
