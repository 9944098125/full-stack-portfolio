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
exports.login = exports.getBasicUserDetails = exports.updateUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { fullName, email, occupation, age, resume } = req.body;
        const updatedUser = yield User_1.default.findByIdAndUpdate(userId, {
            fullName,
            email,
            occupation,
            age,
            resume,
        }, { new: true });
        res.status(200).json({
            message: `${fullName === null || fullName === void 0 ? void 0 : fullName.split(" ")[0]} your details have been updated successfully`,
            user: updatedUser,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateUser = updateUser;
const getBasicUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ _id: req.params.userId });
        res.status(200).json({
            message: "User details fetched successfully",
            user: {
                fullName: user === null || user === void 0 ? void 0 : user.fullName,
                email: user === null || user === void 0 ? void 0 : user.email,
                occupation: user === null || user === void 0 ? void 0 : user.occupation,
                age: user === null || user === void 0 ? void 0 : user.age,
                resume: user === null || user === void 0 ? void 0 : user.resume,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getBasicUserDetails = getBasicUserDetails;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        if ((user === null || user === void 0 ? void 0 : user.password) !== password) {
            return res.status(401).json({
                message: "Invalid password",
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user === null || user === void 0 ? void 0 : user._id }, process.env.SECRET_TOKEN);
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user === null || user === void 0 ? void 0 : user._id,
                age: user === null || user === void 0 ? void 0 : user.age,
                resume: user === null || user === void 0 ? void 0 : user.resume,
                occupation: user === null || user === void 0 ? void 0 : user.occupation,
                name: user === null || user === void 0 ? void 0 : user.fullName,
                email: user === null || user === void 0 ? void 0 : user.email,
            },
            token: token,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.login = login;
