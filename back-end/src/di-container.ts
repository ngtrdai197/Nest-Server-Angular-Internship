import { Container } from "inversify";
import { makeLoggerMiddleware } from "inversify-logger-middleware";
import { IUserRepository } from "./interfaces/IRepositories";
import { UserRepository } from "./repositories";
import { REPOTYPES, SERVTYPES } from "./common";
import { IUserService } from "./interfaces/IServices";
import { UserService } from "./services";

export const createContainer = async (): Promise<Container> => {
  // load everything needed to the Container
  const container = new Container({ defaultScope: "Singleton" });

  if (process.env.NODE_ENV === "development") {
    const logger = makeLoggerMiddleware();
    container.applyMiddleware(logger);
  }
  container.bind<IUserRepository>(REPOTYPES.IUserRepository).to(UserRepository);
  container.bind<IUserService>(SERVTYPES.IUserService).to(UserService);

  return container;
};
