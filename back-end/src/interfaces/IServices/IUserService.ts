import { IUser } from "../../entities";

export abstract class IUserService {
    abstract findOne(query: any): Promise<IUser>;
    abstract findAll(): Promise<IUser[]>
    abstract create(user: IUser): Promise<IUser>
    abstract update(user: IUser): Promise<IUser>;
    abstract delete(id: string): Promise<any>;
}