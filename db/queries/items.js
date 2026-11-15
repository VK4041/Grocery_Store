const pool = require("../pool");

async function getCatItems(catId) {
  const items = await pool.query(
    `select * from items 
    where category_id = ($1)`,
    [catId],
  );
  const numItems = await pool.query(
    `select count(*) as "num_items" from items 
    where category_id = ($1)
    `,
    [catId],
  );
  return [items.rows, numItems.rows[0].num_items];
}
async function getAllItems() {
  const { rows } = await pool.query(
    `select * from categories 
    inner join items on 
    categories.id = items.category_id`,
    [catId],
  );
  return rows;
}
async function getItem(itemId) {
  const { rows } = await pool.query(
    `select items.id as item_id, 
    items.name as item_name,
    items.description as item_desc,
    items.price as item_price, 
    items.stock_qty as item_stock
    from categories 
    inner join items on 
    categories.id = items.category_id
    where items.id = ($1)
    `,
    [itemId],
  );
  return rows[0];
}
module.exports = {
  getCatItems,
  getAllItems,
  getItem,
};
