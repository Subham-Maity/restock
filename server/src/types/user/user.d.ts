export interface IUser {
    email: string;
    password: Buffer;
    role: string;
    addresses?: Array<any>;
    name?: string;
    salt?: Buffer;
    resetPasswordToken?: string;
    createdAt?: Date;
    updatedAt?: Date;
    orders?: Array<any>;
}
