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
    const apiAddress = await this.instanceService.getApiAddress(email)
    const resultApi = await getStudentApi(`https://${apiAddress}`).get('/users')

    if (resultApi.data[0]['email'] === 'john@example.fr') {
      await this.updateScoreUser(email, 1, 10)
      return true
    } else {
      return resultApi.data[0]
    }
  }

  static async secondQuestion(): Promise<any> {
    await getStudentApi('http://localhost:5050').put('/users/johndoe@hetic.fr', {
      first_name: 'name'
    })
    const resultApi = await getStudentApi('http://localhost:5050').get('/users/johndoe@hetic.fr')
    if ('name' in resultApi) {
      return true
    } else {
      return resultApi.data
    }
  }
}
