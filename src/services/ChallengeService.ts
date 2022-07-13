/* eslint-disable max-len */
import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { DB } from '../db/db';
import { Challenge, ChallengeRequest } from '../types/ChallengeType';

export class ChallengeService {
  static database = DB.Connection

  static async getOneChallenge(id: number): Promise<Challenge> {
    try {
      const challenge = await this.database.query<Challenge & RowDataPacket[]>(
        `SELECT * FROM challenge where id_challenge=${id}`
      )
      return challenge[0]
    } catch (err) {
      throw new Error(err)
    }
  }

  static async getAllChallenges(): Promise<Challenge[]> {
    try {
      const challenges = await this.database.query<Challenge[] & RowDataPacket[]>('SELECT * FROM challenge')
      return challenges[0]
    } catch (err) {
      throw new Error(err)
    }
  }

  static async createChallenge(challengeData: ChallengeRequest): Promise<Challenge> {
    const data = await this.database.query<OkPacket & ResultSetHeader>(
      'INSERT INTO challenge (name, expiration_date, id_test)  VALUE(?, STR_TO_DATE(?, "%m-%d-%Y %H:%i:%s"), ?)',
      [challengeData.name, challengeData.expirationDate, challengeData.testId]
    )

    return new Challenge(data[0].insertId, challengeData.name, challengeData.expirationDate, challengeData.testId)
  }

  static async update(idChallenge: string, challengeData: Partial<ChallengeRequest>): Promise<void> {
    const sql = 'UPDATE challenge SET name = ?, expiration_date = STR_TO_DATE(?, "%m-%d-%Y %H:%i:%s"),  id_test = ? WHERE id_challenge = ?'
    await this.database.query<Challenge & ResultSetHeader>(sql, [
      challengeData.name,
      challengeData.expirationDate,
      challengeData.testId,
      idChallenge
    ])
  }

  static async delete(challengeId: number): Promise<void> {
    await this.database.query('DELETE FROM challenge WHERE id_challenge = ?', [challengeId])
  }

  static async getChallengePromoScore(promotionId: number, challengeId: number) {
    try {
      const data = await this.database.query<any & RowDataPacket[]>(
        `select first_name as Prenom,
          last_name as Nom,
          challenge_user.score as Note,
          promotion.name as promotion,
          challenge.name as challenge
          from user
          INNER JOIN challenge_user ON user.id_user = challenge_user.id_user
          INNER JOIN challenge ON challenge_user.id_challenge = challenge.id_challenge
          INNER JOIN promotion ON user.promotion_id = promotion.id_promotion
          where ROLE="ROLE_USER" and promotion.id_promotion="${promotionId}" and challenge.id_challenge="${challengeId}"`
      )
      return data[0]
    } catch (err) {
      throw new Error(err)
    }
  }
}
