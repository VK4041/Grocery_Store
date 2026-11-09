const { Client } = require('pg');
require('dotenv').config();

const SQL = `
    INSERT INTO CATEGORIES (name, description)
    VALUES 
    ('dairy', 'Dairy products'),
    ('meat', 'Meat and eggs'),
    ('veg', 'Fruits and vegetables')
    ;

    INSERT INTO ITEMS (name, description, price, stock_qty)
    VALUES
    ('milk', 'Milk', 5.0, 100),
    ('cheese', 'Cheese', 6.50, 50),
    ('eggs', 'Eggs', 3.50, 20),
    ('chicken', 'Chicken', 10.99, 10),
    ('carrots', 'Carrots', 1.99, 15);
`;

async function main() {
  console.log('Inserting Dummy Data...');
  const client = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('Done');
}

main();
