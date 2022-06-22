import { OkPacket, RowDataPacket } from 'mysql2'
import { DB } from '../db/db'
import { IUser, IUserByEmail, IUserCreate, IUserUpdate } from '../Type/AuthenticationType'
import { IUpdateResponse, ICreateResponse } from '../Type/api/APIResponses'

export class UserService {
  public async getAllUsers(): Promise<any> {
    const db = DB.Connection
    // create a new query to fetch all records from the table
    try {
      const data = await db.query<RowDataPacket[]>(`select * from user`)
      return data[0]
    } catch (err) {
      return
    }
  }

  public async getUserByEMail(userEmail: string): Promise<IUser | undefined> {
    const db = DB.Connection
    // create a new query to fetch all records from the table
    const data = await db.query<IUser & RowDataPacket[]>(`select * from user where email="${userEmail}"`)
    if (data[0].length > 0) {
      return {
        userId: data[0][0].userId,
        email: data[0][0].email,
        role: data[0][0].ROLE,
        firstName: data[0][0]?.firstName,
        lastName: data[0][0]?.lastName
      }
    }
    return undefined
  }

  public async getUser(id: number): Promise<any> {
    const db = DB.Connection
    // create a new query to fetch all records from the table
    const data = await db.query<IUser & RowDataPacket[]>(`select * from user where userId=${id}`)
    if (data[0].length > 0) {
      return data[0][0]
    } else {
      throw new Error('Not Found')
    }
  }

  public async createUser(user: IUserCreate): Promise<IUser> {
    const db = DB.Connection
    const data = await db.query<OkPacket>(
      `INSERT INTO user (email, firstName, lastName, ROLE) VALUES ("${user.email}", "${user.firstName}", "${user.lastName}", "${user.role}")`
    )
    let UserCreated: IUser = {
      userId: data[0].insertId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role
    }
    return UserCreated
  }

  public async updateUser(user: IUserUpdate, userId: number): Promise<IUpdateResponse> {
    try {
      const db = DB.Connection

      const userExist = await db.query<IUser & RowDataPacket[]>(`select email from user where userId = ${userId}`)
      if (userExist[0].length > 0) {
        const data = await db.query<OkPacket>(`update user set ? where id = ?`, [user, userId])
        return {
          rows: data[0].affectedRows,
          message: `user ${user} was successfully modified!`
        }
      } else {
        throw new Error('Not Found')
      }
    } catch (err) {
      throw err
    }
  }

  public async deleteUser(id: number): Promise<IUpdateResponse> {
    const db = DB.Connection
    const data = await db.query<OkPacket>(`delete from user where userId = ?`, [id])

    return {
      rows: data[0].affectedRows,
      message: 'user successfully deleted'
    }
  }
}
