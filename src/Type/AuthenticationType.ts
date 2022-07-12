export interface IUser {
    userId: number;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string;
}

export type IUserByEmail = Pick<IUser, 'userId' & 'role'>

export type UserCreate = Pick<IUser, 'email' | 'firstName' | 'lastName' | 'role'>;
export type UserUpdate = Partial<UserCreate>;
export type IUserRO = Readonly<IUser>;
