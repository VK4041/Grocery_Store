const pool = require("../pool");

async function getAllCategories() {
  const { rows } = await pool.query("select * from categories");
  return rows;
}
async function getCatIdByName(catName) {
  const result = await pool.query(
    `
    SELECT id FROM categories
    where name = ($1)
    `,
    [catName],
  );
  return result.rows[0].id;
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
async function updateCat(cat) {
  await pool.query(
    `
    UPDATE categories
    SET
    name = $1,
    description = $2
    WHERE 
    id = $3    
    `,
    [cat.catName, cat.catDesc, cat.cat_id],
  );
}
async function deleteCat(cat_id) {
  await pool.query(
    `
    DELETE FROM categories
    WHERE
    id = $1
    `,
    [cat_id],
  );
}
module.exports = {
  getAllCategories,
  getCatDetails,
  createNewCat,
  getCatIdByName,
  updateCat,
  deleteCat,
};
