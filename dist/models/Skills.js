"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const skillsSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Skills = mongoose_1.default.model("Skills", skillsSchema);
exports.default = Skills;
