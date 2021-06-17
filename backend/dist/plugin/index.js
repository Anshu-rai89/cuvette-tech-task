"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.featuresPlugins = exports.database = void 0;
var database_1 = __importDefault(require("./database"));
var api_1 = __importDefault(require("./api"));
exports.database = [database_1.default];
exports.featuresPlugins = [api_1.default];
