import ApiController from "./api.controller";
import { apiPayload } from "./api.validation";
const controller = new ApiController();
const ApiRoutes = [
  {
    method: "GET",
    path: "/getData",
    handler: controller.getPhrase,
  },
  {
    method: "GET",
    path: "/getPhrase",
    handler: controller.getPhraseFromMongo,
  },
  {
    method: "POST",
    path: "/addLocalPhrase",
    handler: controller.write,
  },
  {
    method: "POST",
    path: "/addPhrase",
    handler: controller.writePhraseToMongo,
  },
  {
    method: "DELETE",
    path: "/deleteLocalPhrase/{id}",
    handler: controller.delete,
  },
  {
    method: "DELETE",
    path: "/deletePhrase/{id}",
    handler: controller.deletePhareFromMongo,
  },
  {
    method: "GET",
    path: "/loadPhraseToMongo",
    handler: controller.loadPhareToMongo,
  },
  {
    method: "GET",
    path: "/loadData",
    handler: controller.loadPhareToMongo,
  },
];

export default ApiRoutes;