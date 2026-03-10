import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import FormData from 'form-data';

async function runTest() {
  const url = 'http://localhost:3000/upload';
  const form = new FormData();

  form.append('customer_id', '1');
  form.append('status', 'pending');
  // Node's built-in FormData typings don't accept ReadStream, so cast to any
  form.append('file', fs.createReadStream(path.join(__dirname, 'sample.csv')) as any);

  const res = await fetch(url, { method: 'POST', body: form });
  console.log('response status:', res.status);
  const text = await res.text();
  console.log('response body:', text);
}

runTest().catch((err) => {
  console.error('test failed', err);
  process.exit(1);
});
