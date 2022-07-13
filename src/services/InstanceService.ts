/* eslint-disable max-len */
import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2'
import { DB } from '../db/db'
import { InstanceApi } from '../Type/InstanceConnection'

export class InstanceService {
  static database = DB.Connection

  static async getApiAddress(emailUser: string): Promise<any> {
    try {
      const responseUserId = await this.database.query<RowDataPacket[]>(
        `SELECT id_user from user where email="${emailUser}";`
      )
      const userId = responseUserId[0][0]['id_user']
      const responseApi = await this.database.query<RowDataPacket[]>(
        `SELECT ip_adress from instance where id_user = ${userId}`
      )
      const apiAddress = responseApi[0][0]['ip_adress']
      return apiAddress
    } catch (err) {
      throw new Error(err)
    }
  }

  static async createApiInstance(body: InstanceApi): Promise<void> {
    try {
      const responseUserId = await this.database.query<RowDataPacket[]>(
        `SELECT id_user from user where email="${body.userEmail}";`
      )
      const userId = responseUserId[0][0]['id_user']
      await this.database.query<RowDataPacket[]>(
        `INSERT INTO instance (ip_adress, id_user, username, ssh_key) values ("${body.ipAddress}", ${userId}, "", "");`
      )
    } catch (err) {
      throw new Error(err)
    }
  }
}
