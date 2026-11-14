const pool = require("../pool");

async function getAllCategories() {
  const { rows } = await pool.query("select * from categories");
  return rows;
}
async function getCatName(catId) {
  const { rows } = await pool.query(
    "select name from categories where id = ($1)",
    [catId],
  );
  return rows[0].name;
}

module.exports = {
  getAllCategories,
  getCatName,
};
