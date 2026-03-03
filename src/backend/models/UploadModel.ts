// Insere o arquivo no banco de dados
// Queries SQL aqui

// userRepository.ts
import { Pool } from 'pg'; // Driver do Postgres

// Configuração da conexão (geralmente vinda de variáveis de ambiente)
const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'seu_db',
  password: 'sua_senha',
  port: 5432,
});

export class UserRepository {
  
  async create(user: User): Promise<User> {
    const query = `
      INSERT INTO usuarios (nome, email)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [user.nome, user.email];

    try {
      const res = await pool.query(query, values);
      // Retorna o registro inserido (com ID e timestamp gerados pelo DB)
      return res.rows[0];
    } catch (err) {
      console.error('Erro ao inserir usuário:', err);
      throw err;
    }
  }
}