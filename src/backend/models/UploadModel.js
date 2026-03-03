const db = require('../../database/runDB/init')

class UploadModel {
  static async create(customer_id, file_path) {
    const query = 'INSERT INTO submission (customer_id, file_path, upload_date) VALUES ($1, $2, NOW()) RETURNING *';
    const values = [customer_id, file_path];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async getAll() {
    const query = 'SELECT * FROM submission';
    const result = await db.query(query);
    return result.rows;
  }
}

async function testCreate() {
  const res = await UploadModel.create(1, '/uploads/file.pdf');
  console.log(res);
}

// testCreate();

async function testGetAll() {
  const res = await UploadModel.getAll( );
  console.log(res);
}

testGetAll();

module.exports = UploadModel;

/*
CREATE TABLE SUBMISSION (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    file_path TEXT NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_submission_customer FOREIGN KEY (customer_id) REFERENCES CUSTOMER(id) ON DELETE CASCADE
);
*/