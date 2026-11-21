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
async function getItem(itemId) {
  const { rows } = await pool.query(
    `select items.id as item_id, 
    items.name as item_name,
    items.description as item_desc,
    items.price as item_price, 
    items.stock_qty as item_stock,
    items.category_id as "cat_id",
    categories.name as "cat_name"
    from categories 
    inner join items on 
    categories.id = items.category_id 
    where items.id = ($1)
    `,
    [itemId],
  );
  return rows[0];
}
async function createNewItem(item) {
  await pool.query(
    `
    INSERT INTO ITEMS (name, description, price, stock_qty, category_id)
    VALUES
  (($1),($2),($3),($4),($5))`,
    Object.values(item),
  );
  console.log(`A new item has been added`);
}
async function updateItem(item) {
  console.log(item);
  const { rows } = await pool.query(
    `
    UPDATE ITEMS
    SET 
    name = ($2),
    description = ($3),
    price = ($4),
    stock_qty = ($5),
    category_id = ($6) 
    WHERE
    id = ($1)
    `,
    [
      item.itemId,
      item.itemName,
      item.itemDesc,
      item.itemPrice,
      item.itemStock,
      item.itemCatId,
    ],
  );
  console.log(`Item "${item.itemName}" was updated`);
}
module.exports = {
  getCatItems,
  getItem,
  createNewItem,
  updateItem,
};
