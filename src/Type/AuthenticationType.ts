export interface IUser {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
}

export type IUserCreate = Pick<IUser, "email" | "firstName" | "lastName">;
export type IUserUpdate = Partial<IUserCreate>;
export type IUserRO = Readonly<IUser>;
