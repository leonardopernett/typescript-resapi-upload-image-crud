"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
exports.connection = async () => {
    try {
        await mongoose_1.default.connect('mongodb://localhost/photo-gallerry-db', config);
        console.log("db is connected");
    }
    catch (err) {
        console.log(err);
    }
};
