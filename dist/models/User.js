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
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    occupation: {
        type: String,
    },
    age: {
        type: Number,
    },
    resume: {
        type: String,
    },
    skills: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Skills",
        },
    ],
    projects: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Projects",
        },
    ],
    experience: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Experience",
        },
    ],
}, { timestamps: true });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User.findOne(); // Check if any user already exists
        if (user && this.isNew) {
            throw new Error("A user already exists. Only one user can be created.");
        }
        next();
    });
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
