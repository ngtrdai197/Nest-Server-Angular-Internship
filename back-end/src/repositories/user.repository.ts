import { injectable } from "inversify";
import { IUserRepository } from "../interfaces/IRepositories";
import { IUser, userModel } from "../entities";

@injectable()
export class UserRepository implements IUserRepository {
  findOne = async (query: any): Promise<IUser> => {
    const user = await userModel.findOne(query);
    return user as IUser;
  };

  findAll = async (): Promise<IUser[]> => {
    return await userModel.find({});
  };

  create = async (user: IUser): Promise<IUser> => {
    return await userModel.create(user);
  };

  update = async (user: IUser): Promise<IUser> => {
    await userModel.findByIdAndUpdate(user.id, user);
    const updated = await userModel.findById(user.id);
    
    return updated as IUser;
  };

  delete = async (id: string): Promise<any> => {
    await userModel.findByIdAndRemove(id);
    return { isDeleted: true, message: `Successfully deleted user with id: ${id}` };
  }
}
