import { RowDataPacket } from 'mysql2'
import { DB } from '../db/db'

export class AdminService {
  public async generateExcel(): Promise<any> {
    const XLSX = require('xlsx')
    const db = DB.Connection
    // create a new query to fetch all records from the table
    try {
      const data = await db.query<RowDataPacket[]>(
        'select firstName as Prenom, lastName as Nom, score as Note from user where ROLE="ROLE_USER"'
      )

      const jsonData = data[0]
      const worksheet = XLSX.utils.json_to_sheet(jsonData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Etudiant')

      // Writing to our file
      XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' })
      XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' })
      XLSX.writeFile(workbook, './etudiant.xlsx')
      return workbook
    } catch (err) {
      return err
    }
  }
}
