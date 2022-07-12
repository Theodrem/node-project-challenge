import { RowDataPacket } from 'mysql2';
import { DB } from '../db/db';

export class AdminService {
  db = DB.Connection;

  public async generateExcel(promotionName: string, challengeName: string): Promise<any> {
    const XLSX = require('xlsx');
    // create a new query to fetch all records from the table
    try {
      const data = await this.db.query<RowDataPacket[]>(
        `select first_name as Prenom,
          last_name as Nom,
          challenge_user.score as Note,
          promotion.name as promotion,
          challenge.name as challenge
          from user
          INNER JOIN challenge_user ON user.id_user = challenge_user.id_user
          INNER JOIN challenge ON challenge_user.id_challenge = challenge.id_challenge
          INNER JOIN promotion ON user.promotion_id = promotion.id_promotion
          where ROLE="ROLE_USER" and promotion.name="${promotionName}" and challenge.name="${challengeName}"`,
      );

      const jsonData = data[0];
      const worksheet = XLSX.utils.json_to_sheet(jsonData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, `${challengeName} - ${promotionName}`);

      // Writing to our file
      XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
      XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
      XLSX.writeFile(workbook, `./${promotionName}-${challengeName}.xlsx`);
      return workbook;
    } catch (err) {
      return err;
    }
  }

  public async getPromotion(promotionParam: number | string): Promise<any> {
    try {
      const data = await this.db.query<RowDataPacket[]>(
        `select first_name as Prenom,
         last_name as Nom
         from user
         INNER JOIN promotion ON user.promotion_id=promotion.id_promotion
         where promotion.id_promotion="${promotionParam}" or promotion.name="${promotionParam}"`,
      );
      return data[0];
    } catch (err) {
      return err;
    }
  }

  public async getChallenge(challengeParam: number | string): Promise<any> {
    try {
      const data = await this.db.query<RowDataPacket[]>(
        `select 
         challenge.name as Challenge,
         promotion.name as Promotion
         from challenge
         LEFT JOIN challenge_promotion ON challenge.id_challenge=challenge_promotion.id_challenge
         LEFT JOIN promotion ON challenge_promotion.id_promotion=promotion.id_promotion
         where challenge.id_challenge="${challengeParam}" or challenge.name="${challengeParam}"`,
      );
      return data[0];
    } catch (err) {
      return err;
    }
  }
}
