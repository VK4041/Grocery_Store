const pool = require("../pool");

async function getCatItems(catId) {
  const { rows } = await pool.query(
    "select * from items where category_id = ($1)",
    [catId],
  );
  return rows;
}

module.exports = {
  getCatItems,
};
