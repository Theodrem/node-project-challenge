import { OkPacket, RowDataPacket } from 'mysql2';
import { DB } from '../db/db';
import { IUser, UserCreate, UserUpdate } from '../Type/AuthenticationType';
import { IUpdateResponse, ICreateResponse } from '../Type/api/APIResponses';

export class UserService {
  db = DB.Connection;

  public async getAllUsers(): Promise<IUser[]> {
    // create a new query to fetch all records from the table
    try {
      const data = await this.db.query<IUser[] & RowDataPacket[]>('select * from user');
      return data[0];
    } catch (err) {
      throw new Error('An error was occurred');
    }
  }

  public async getUserByEmail(userEmail: string): Promise<IUser> {
    // create a new query to fetch all records from the table
    const data = await this.db.query<IUser & RowDataPacket[]>(`select * from user where email="${userEmail}"`);

    if (!data[0].length) throw new Error('User not found');

    return {
      userId: data[0][0].userId,
      email: data[0][0].email,
      role: data[0][0].ROLE,
      firstName: data[0][0]?.firstName,
      lastName: data[0][0]?.lastName,
    };
  }

  public async getUser(id: number): Promise<any> {
    // create a new query to fetch all records from the table
    const data = await this.db.query<IUser & RowDataPacket[]>(`SELECT * FROM user WHERE id_user=${id}`);
    if (!data[0].length) throw new Error('Not Found');
    console.log(data);
    return data[0][0];
  }

  public async createUser(user: UserCreate): Promise<IUser> {
    const data = await this.db.query<OkPacket>(
      `INSERT INTO user (email, first_name, last_name) VALUES ("${user.email}", "${user.firstName}", "${user.lastName}")`,
    );
    const UserCreated: IUser = {
      userId: data[0].insertId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return UserCreated;
  }

  public async updateUser(userUpdate: UserUpdate, userId: number): Promise<IUpdateResponse> {
    const user: boolean = !!this.getUser(userId);
    if (!user) throw new Error('User not found');
    const data = await this.db.query<OkPacket>('update user set ? where id = ?', [user, userId]);
    return {
      rows: data[0].affectedRows,
      message: `user ${user} was successfully modified!`,
    };
  }

  public async deleteUser(id: number): Promise<IUpdateResponse> {
    const data = await this.db.query<OkPacket>('delete from user where id_user = ?', [id]);

    return {
      rows: data[0].affectedRows,
      message: 'user successfully deleted',
    };
  }
}
