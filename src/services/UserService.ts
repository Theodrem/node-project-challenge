import { DB } from '../db/db';
import { IUser, UserCreationParams } from '../Type/AuthenticationType';

 
export class UserService {

  public async getUser(userEmail: string): Promise<any> {
    const db = DB.Connection;
    
    console.log(db);
    // create a new query to fetch all records from the table
    try {
      const query = await db.query(`select id from user where email=${userEmail}`);
      return query
    } catch (err) {
      return;
    }
  }
  

  public async createUser(user: UserCreationParams): Promise<any> {
    const db = DB.Connection;
    console.log(db);
    try {
      const createUser = await db.query(`INSERT INTO user (firstName, lastName, email) VALUES ("${user.firstName}", "${user.lastName}" "${user.email}");`);
      return (`user ${user.email} created`);
    } catch (err) {
      return;
    }
  }
}
