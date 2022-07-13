/* eslint-disable max-len */
import { RowDataPacket, OkPacket } from 'mysql2'
import { getStudentApi } from '../config/connectionApiStudent'
import { DB } from '../db/db'
import { InstanceService } from './InstanceService'
import { UserService } from './UserService'
import { IUpdateResponse } from '../Type/api/APIResponses'

export class ChallengeTest {
  static database = DB.Connection
  static instanceService = InstanceService
  static userService = UserService

  static async updateScoreUser(userEmail: string, challengeId: number, score: number): Promise<IUpdateResponse> {
    try {
      const db = DB.Connection
      const responseUserId = await db.query<RowDataPacket[]>(`select id_user from user where email = "${userEmail}"`)
      const userId = responseUserId[0][0]['id_user']
      const data = await db.query<OkPacket>(
        'update challenge_user set score = ? where id_challenge = ? and id_user = ?',
        [score, challengeId, userId]
      )
      return {
        rows: data[0].affectedRows,
        message: `score was successfully modified!`
      }
    } catch (err) {
      throw err
    }
  }

  static async firstQuestion(email: string): Promise<any> {
    await this.updateScoreUser(email, 1, 1)
    const apiAddress = await this.instanceService.getApiAddress(email)
    const resultApi = await getStudentApi(`https://${apiAddress}`).get('/users')

    if (resultApi.data[1]['email'] === 'john@example.fr' && resultApi.data[1]['firstName'] === 'john') {
      await this.updateScoreUser(email, 1, 10)
      return true
    } else {
      return resultApi.data
    }
  }

  static async secondQuestion(email: string): Promise<any> {
    const firstQuestion = await this.firstQuestion(email)
    if (firstQuestion === true) {
      const apiAddress = await this.instanceService.getApiAddress(email)
      const resultApi = await getStudentApi(`https://${apiAddress}`).put('/users/johndoe@hetic.fr', {
        first_name: 'name_test'
      })
      if ('name' in resultApi.data[0]['email']) {
        return true
      } else {
        return resultApi.data
      }
    } else {
      return this.secondQuestion(email)
    }
  }
}
