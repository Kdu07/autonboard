const db = require('./src/database/config/db').default;
db.query('SELECT id, email FROM customer LIMIT 5')
  .then(r => {
    console.log('CUSTOMERS:');
    console.log(JSON.stringify(r.rows, null, 2));
    process.exit(0);
  })
  .catch(e => {
    console.error('ERROR:', e.message);
    process.exit(1);
  });
