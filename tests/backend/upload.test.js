console.log('starting upload test');
const fs = require('fs');
const path = require('path');
// Node 18+ has global fetch and FormData available

// __dirname is provided by CommonJS

async function runTest() {
  // use PORT or DB_PORT if the express server is using the same variable
  const port = process.env.PORT || process.env.DB_PORT || 3000;
  const url = `http://localhost:${port}/upload`;
  const form = new FormData();

  form.append('customer_id', '1');
  form.append('status', 'pending');
  form.append('file', fs.createReadStream(path.join(__dirname, 'sample.csv')));

  const res = await fetch(url, { method: 'POST', body: form });
  console.log('response status:', res.status);
  const text = await res.text();
  console.log('response body:', text);
}

runTest().catch((err) => {
  console.error('test failed', err);
  process.exit(1);
});
