/* eslint-disable max-len */
import { OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';
import { DB } from '../db/db';
import { Challenge, CreateChallengeRequest, UpdateChallengeRequest } from '../Type/ChallengeType';

export class ChallengeService {
  static database = DB.Connection;

  public static async getAllChallenges(): Promise<Challenge[]> {
    try {
      const challenges = await this.database.query<Challenge[] & RowDataPacket[]>('SELECT * FROM challenge');
      return challenges[0];
    } catch (err) {
      throw new Error(err);
    }
  }

  public static async createChallenge(challengeData: CreateChallengeRequest): Promise<Challenge> {
    const data = await this.database.query<OkPacket & ResultSetHeader>('INSERT INTO challenge (name, expiration_date, id_test)  VALUE(?, ?, ?)', [challengeData.name, challengeData.expirationDate, challengeData.testId]);

    return new Challenge(
      data[0].insertId,
      challengeData.name,
      challengeData.expirationDate,
      challengeData.testId,
    );
  }

  public static async update(idChallenge: number, challengeData: UpdateChallengeRequest): Promise<void> {
    const sql = `UPDATE challenge SET name = ?, expiration_date = ?,  id_test = ? WHERE id_challenge = ${idChallenge}`;
    const result = this.database.query(sql, [challengeData.name, challengeData.expirationDate, challengeData.testId]);
    console.log(result);
  }

  public static async delete(challengeId: number): Promise<void> {
    await this.database.query('DELETE challenge WHERE id_challenge = ?', [challengeId]);
  }
}
