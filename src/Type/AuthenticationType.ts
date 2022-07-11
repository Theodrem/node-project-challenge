export interface IUser {
    userId: number;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string;
}

export type IUserByEmail = Pick<IUser, 'userId' & 'role'>

export type IUserCreate = Pick<IUser, "email" | "firstName" | "lastName" | "role">;
export type IUserUpdate = Partial<IUserCreate>;
export type IUserRO = Readonly<IUser>;
