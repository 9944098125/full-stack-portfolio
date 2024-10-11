"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const experienceSchema = new mongoose_1.default.Schema({
    company: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    experienceSummary: {
        type: String,
        required: true,
    },
    technologiesWorkedOn: {
        type: [String],
        required: true,
    },
    responsibilities: {
        type: [String],
        required: true,
    },
}, { timestamps: true });
const Experience = mongoose_1.default.model("Experience", experienceSchema);
exports.default = Experience;
