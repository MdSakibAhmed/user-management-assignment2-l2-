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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalPriceFromDB = exports.getAllorderFromDB = exports.createOrderIntoDB = exports.deleteUserFromDB = exports.updateSingleUserFromDB = exports.getSingleUserFromDB = exports.getAllUserFromDB = exports.createUserIntoDB = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = (yield user_model_1.User.create(user)).toObject(), { password, _id } = _a, result = __rest(_a, ["password", "_id"]);
    return result;
});
exports.createUserIntoDB = createUserIntoDB;
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({}, { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 });
    return result;
});
exports.getAllUserFromDB = getAllUserFromDB;
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId }, { password: 0, _id: 0, orders: 0, __v: 0 });
    return result;
});
exports.getSingleUserFromDB = getSingleUserFromDB;
const updateSingleUserFromDB = (user, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ userId }, user, {
        new: true,
    }).select({ password: 0, __v: 0, orders: 0, _id: 0 });
    return result;
});
exports.updateSingleUserFromDB = updateSingleUserFromDB;
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.deleteOne({ userId });
    return result;
});
exports.deleteUserFromDB = deleteUserFromDB;
// Order managment
const createOrderIntoDB = (userId, order) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.updateOne({ userId }, { $push: { orders: order } });
    return result;
});
exports.createOrderIntoDB = createOrderIntoDB;
const getAllorderFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId }, { orders: 1, _id: 0 });
    return result;
});
exports.getAllorderFromDB = getAllorderFromDB;
const getTotalPriceFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.aggregate([
        // stage 1
        {
            $match: { userId },
        },
        //stage 2
        {
            $project: {
                orders: 1,
                _id: 0,
            },
        },
        {
            $unwind: "$orders",
        },
        // stage 3
        {
            $group: {
                _id: null,
                totalPrice: {
                    $sum: { $multiply: ["$orders.price", "$orders.quantity"] },
                },
            },
        },
        {
            $project: {
                _id: 0,
            },
        },
    ]);
    return result;
});
exports.getTotalPriceFromDB = getTotalPriceFromDB;
