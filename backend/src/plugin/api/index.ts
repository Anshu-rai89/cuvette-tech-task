import { IExtendedServer } from ".//..//../interfaces";
import ApiRoutes from "./api.route";
const ApiPlugin = {
  name: "App-Api",
  version: "0.1.0",
  register: function (server: any) {
    server.route(ApiRoutes);
  },
};

export default ApiPlugin;
