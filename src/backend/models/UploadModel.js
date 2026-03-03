const db = require('../../database/runDB/init')

class UploadModel {
  

  // Criar novo usuário
  static async create(name, email) {
    const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
    const values = [name, email];
    const result = await db.query(query, values);
    return result.rows[0];
  }
}

//uploadModel = new UploadModel();
//res = uploadModel.create();
//console.log(res);

module.exports = UploadModel;