import mysql, { Pool } from 'mysql2/promise';

export class DB {
  private static POOL: Pool;

  static get Connection(): Pool {
    if (!this.POOL) {
      this.POOL = mysql.createPool({
        host: process.env.DB_HOST || 'db',
        user: process.env.DB_USER || 'root',
        database: process.env.DB_DATABASE || 'challenge_dev',
        password: process.env.DB_PASSWORD || 'db-dev-password'
      })
    }

    return this.POOL;
  }
}
