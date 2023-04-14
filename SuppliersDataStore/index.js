const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'suppliers',
  password: 'root',
  port: 5432,
});


client.connect();


client.query('SELECT * FROM supplier', (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res.rows);
    }
  });