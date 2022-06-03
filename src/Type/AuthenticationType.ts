export interface IUser {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    
}

export type UserCreationParams = Pick<IUser, "email" | "firstName" | "lastName">;
