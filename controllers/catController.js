const catQueries = require("../db/queries/categories");
const itemQueries = require("../db/queries/items");
const { emptyToNull } = require("./helper");

module.exports = {
  getUnCatItems: async (req, res) => {
    const [items, numItems] = await itemQueries.getAllUncatItems();
    res.render("catItems", {
      title: "Uncategorized Items",
      type: "uncategorized",
      items,
      numItems,
    });
  },
  getCatItems: async (req, res) => {
    const cat_id = req.params.id;
    //Get items for that category
    const [items, numItems] = await itemQueries.getCatItems(cat_id);
    const { name, description } = await catQueries.getCatDetails(cat_id);
    res.render("catItems", {
      title: name.at(0).toUpperCase().concat(name.slice(1)),
      items,
      numItems,
      catDesc: description,
      cat_id,
      type: "categorized",
    });
  },
  createCatForm: (req, res) => {
    res.render("create/createCat", { title: "Create New Category" });
  },
  createCat: async (req, res) => {
    const data = req.body;
    emptyToNull(data);
    await catQueries.createNewCat(data);
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
    emptyToNull(cat);
    await catQueries.updateCat(req.body);
    console.log(`Category "${cat.catName}" was updated`);
    res.redirect(`/cat/${cat.cat_id}`);
  },
  confirmDelete: (req, res) => {
    const cat_id = req.params.cat_id;
    res.render("delete/confirmDelete", { type: "cat", id: cat_id });
  },
  deleteCat: async (req, res) => {
    const cat_id = req.params.cat_id;
    const { name } = await catQueries.getCatDetails(cat_id);
    await catQueries.deleteCat(cat_id);
    console.log(`Category "${name}" was deleted`);
    res.redirect("/");
  },
};
