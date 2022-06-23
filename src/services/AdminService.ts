import { RowDataPacket } from 'mysql2'
import { DB } from '../db/db'

export class AdminService {
  public async generateExcel(promotionName: string, challengeName: string): Promise<any> {
    const XLSX = require('xlsx')
    const db = DB.Connection
    // create a new query to fetch all records from the table
    try {
      const data = await db.query<RowDataPacket[]>(
        `select first_name as Prenom,
          last_name as Nom,
          challenge_user.score as Note,
          promotion.name as promotion,
          challenge.name as challenge
          from user
          INNER JOIN challenge_user ON user.id_user = challenge_user.id_user
          INNER JOIN challenge ON challenge_user.id_challenge = challenge.id_challenge
          INNER JOIN promotion ON user.promotion_id = promotion.id_promotion
          where ROLE="ROLE_USER" and promotion.name="${promotionName}" and challenge.name="${challengeName}"`
      )

      const jsonData = data[0]
      const worksheet = XLSX.utils.json_to_sheet(jsonData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, `${challengeName} - ${promotionName}`)

      // Writing to our file
      XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' })
      XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' })
      XLSX.writeFile(workbook, `./${promotionName}-${challengeName}.xlsx`)
      return workbook
    } catch (err) {
      return err
    }
  }
}
