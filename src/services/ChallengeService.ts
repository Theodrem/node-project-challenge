/* eslint-disable max-len */
import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { DB } from '../db/db';
import { Challenge, ChallengeRequest } from '../Type/ChallengeType';

export class ChallengeService {
  static database = DB.Connection

  static async getOneChallenge(id: number): Promise<Challenge> {
    try {
      const challenge = await this.database.query<Challenge & RowDataPacket[]>(`SELECT * FROM challenge where id_challenge=${id}`)
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
    const sql =
      'UPDATE challenge SET name = ?, expiration_date = STR_TO_DATE(?, "%m-%d-%Y %H:%i:%s"),  id_test = ? WHERE id_challenge = ?'
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
}
