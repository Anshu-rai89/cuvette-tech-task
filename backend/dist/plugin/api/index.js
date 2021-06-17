"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_route_1 = __importDefault(require("./api.route"));
var ApiPlugin = {
    name: "App-Api",
    version: "0.1.0",
    register: function (server) {
        server.route(api_route_1.default);
    },
};
exports.default = ApiPlugin;
