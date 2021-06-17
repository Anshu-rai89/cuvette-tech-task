import { Server } from "hapi";
import { IExtendedApplicationState } from "./appication.state";

export interface IExtendedServer extends Server {
  app: IExtendedApplicationState;
}
