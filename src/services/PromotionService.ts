/* eslint-disable max-len */
import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2'
import { DB } from '../db/db'
import { Promotion, PromotionRequest } from '../types/PromotionType'

export class PromotionService {
  static database = DB.Connection

  static async getOnePromotion(id: number): Promise<Promotion> {
    try {
      const promotion = await this.database.query<Promotion & RowDataPacket[]>(
        `SELECT * FROM promotion where id_promotion=${id}`
      )
      return promotion[0]
    } catch (err) {
      throw new Error(err)
    }
  }

  static async getAllPromotions(): Promise<Promotion[]> {
    try {
      const promotions = await this.database.query<Promotion[] & RowDataPacket[]>('SELECT * FROM promotion')
      return promotions[0]
    } catch (err) {
      throw new Error(err)
    }
  }

  static async createPromotion(promotionData: PromotionRequest): Promise<Promotion> {
    const data = await this.database.query<OkPacket & ResultSetHeader>(
      'INSERT INTO promotion (name)  VALUE(?)',
      [promotionData.name]
    )

    return new Promotion(data[0].insertId, promotionData.name)
  }

  static async update(idPromotion: string, promotionData: Partial<PromotionRequest>): Promise<void> {
    const sql =
      'UPDATE promotion SET name = ? WHERE id_promotion = ?'
    await this.database.query<Promotion & ResultSetHeader>(sql, [
      promotionData.name,
      idPromotion
    ])
  }

  static async delete(promotionId: number): Promise<void> {
    await this.database.query('DELETE FROM promotion WHERE id_promotion = ?', [promotionId])
  }
}
