"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./database");
const main = async () => {
    app_1.default.listen(app_1.default.get('port'));
    console.log("server on http://localhost:" + app_1.default.get('port'));
    await database_1.connection();
};
main();
