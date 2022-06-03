import { DB } from '../db/db';
import { IUser, UserCreationParams } from '../Type/AuthenticationType';

 
export class UserService {

  public async create(user: UserCreationParams): Promise<any> {
    const db = DB.Connection;
    
    console.log(db);
     // create a new query to fetch all records from the table
    const query = await db.query(`select id from user where email=${user.email}`);
    if (query ) {
      return query;
    } else {
      const createUser = await db.query(`INSERT INTO user (firstName, lastName, email) VALUES ("${user.firstName}", "${user.lastName}" "${user.email}");`);
      console.log(`User ${createUser}`);
    }
  

   // we run the query and set the result to a new variable
   var rows = db.query(query);

   // return the results
   return rows;
}
}
