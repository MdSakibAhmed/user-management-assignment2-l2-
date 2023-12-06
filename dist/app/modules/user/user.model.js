"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.OrderSchema = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
exports.OrderSchema = new mongoose_1.Schema({
    productName: { type: String },
    quantity: { type: Number },
    price: { type: Number },
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    hobbies: [String],
    address: {
        street: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String, required: true },
    },
    orders: [exports.OrderSchema]
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // console.log("pass",user,"sol", config.salt_rounds);
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.salt_rounds));
        next();
    });
});
userSchema.post("save", function (doc) {
    doc.password = "";
});
// custom instanc method
userSchema.method("isUserExist", function isUserExist(userId) {
    return exports.User.findOne({ userId });
});
// Create a new Model type that khows about TUser methods
// userSchema.methods.isUserExist = async (userId:string) => {
//   return User.findOne({userId})
//}
exports.User = (0, mongoose_1.model)("users", userSchema);