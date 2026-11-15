const pool = require("../pool");

async function getAllCategories() {
  const { rows } = await pool.query("select * from categories");
  return rows;
}

async function getCatDetails(catId) {
  const result = await pool.query(
    `select name, description from categories
    where id = ($1)`,
    [catId],
  );
  return result.rows[0];
}
async function createNewCat(cat) {
  await pool.query(
    `
    INSERT INTO CATEGORIES (name, description)
    VALUES
    (($1), ($2))
    `,
    Object.values(cat),
  );
  console.log("New category has been created");
}

module.exports = {
  getAllCategories,
  getCatDetails,
  createNewCat,
};
