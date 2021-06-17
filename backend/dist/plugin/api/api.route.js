"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_controller_1 = __importDefault(require("./api.controller"));
var api_validation_1 = require("./api.validation");
var controller = new api_controller_1.default();
var ApiRoutes = [
    {
        method: "POST",
        path: "/signup",
        handler: controller.writePhrase,
        options: {
            validate: api_validation_1.apiPayload,
        },
    },
];
exports.default = ApiRoutes;
