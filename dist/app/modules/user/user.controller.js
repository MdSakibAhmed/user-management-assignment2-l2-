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
exports.getTotalPrice = exports.getAllOrder = exports.createOrder = exports.deleteUser = exports.updateSingleUser = exports.getSingleUser = exports.getAllUsers = exports.createUser = void 0;
const user_service_1 = require("./user.service");
const user_model_1 = require("./user.model");
const user_validation_1 = require("./user.validation");
// create a new user into collection
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        // validate with zod
        const zodParsData = user_validation_1.userValidationSchema.parse(user);
        const result = yield (0, user_service_1.createUserIntoDB)(zodParsData);
        const _a = result.toObject(), { password } = _a, data = __rest(_a, ["password"]);
        res
            .status(200)
            .send({ success: true, message: "User created successfully!", data });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message, data: null });
    }
});
exports.createUser = createUser;
// get all users from collection
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, user_service_1.getAllUserFromDB)();
        res
            .status(200)
            .send({ success: true, message: "User feached successfully!", data });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message, data: null });
    }
});
exports.getAllUsers = getAllUsers;
// get a single user by userId from users
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    const user = new user_model_1.User();
    if (!(yield user.isUserExist(userId))) {
        return res.status(404).send({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found",
            },
        });
    }
    try {
        const result = yield (0, user_service_1.getSingleUserFromDB)(userId);
        const data = __rest(result === null || result === void 0 ? void 0 : result.toObject(), []);
        const { password } = data, filteredData = __rest(data, ["password"]);
        res.status(200).send({
            success: true,
            message: "User feached successfully!",
            data: filteredData,
        });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message, data: null });
    }
});
exports.getSingleUser = getSingleUser;
// update a single user info
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = req.body;
    const userId = parseInt(req.params.userId);
    const user = new user_model_1.User();
    if (yield user.isUserExist(userId)) {
        return res.status(404).send({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found",
            },
        });
    }
    try {
        const jodParsData = user_validation_1.userValidationSchema.parse(updatedUser);
        const updatedData = yield (0, user_service_1.updateSingleUserFromDB)(jodParsData, userId);
        const data = __rest(updatedData === null || updatedData === void 0 ? void 0 : updatedData.toObject(), []);
        const { password } = data, filteredData = __rest(data, ["password"]);
        res.status(200).send({
            success: true,
            message: "User updated  successfully!",
            data: filteredData,
        });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message, data: null });
    }
});
exports.updateSingleUser = updateSingleUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    const user = new user_model_1.User();
    if (yield user.isUserExist(userId)) {
        return res.status(404).send({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found",
            },
        });
    }
    try {
        const result = yield (0, user_service_1.deleteUserFromDB)(userId);
        res.status(200).send({
            success: true,
            message: "User deleted  successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message, data: null });
    }
});
exports.deleteUser = deleteUser;
// Order management
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    const order = req.body;
    try {
        // check user is exist or not
        const user = new user_model_1.User();
        if (!(yield user.isUserExist(userId))) {
            return res.status(404).send({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found",
                },
            });
        }
        const jodParData = user_validation_1.orderValidationSchema.parse(order);
        const result = yield (0, user_service_1.createOrderIntoDB)(userId, jodParData);
        res.status(200).send({
            success: true,
            message: "Order created successfully!",
            data: null,
        });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message, data: null });
    }
});
exports.createOrder = createOrder;
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    console.log("userId", userId);
    try {
        // check user is exist or not
        const user = new user_model_1.User();
        if (!(yield user.isUserExist(userId))) {
            return res.status(404).send({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found",
                },
            });
        }
        // get orders
        const data = yield (0, user_service_1.getAllorderFromDB)(userId);
        res
            .status(200)
            .send({ success: true, message: "Order feached successfully!", data });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message, data: null });
    }
});
exports.getAllOrder = getAllOrder;
const getTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    try {
        const total = yield (0, user_service_1.getTotalPriceFromDB)(userId);
        res.send({
            success: true,
            message: "Total price calculated successfully!",
            data: total[0],
        });
    }
    catch (error) {
        res.status(500).send({ success: false, error: error.message, data: null });
    }
});
exports.getTotalPrice = getTotalPrice;
