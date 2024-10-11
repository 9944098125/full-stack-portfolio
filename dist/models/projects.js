"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectsSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    techStack: {
        type: [String],
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
    githubLink: {
        type: String,
        required: true,
    },
    liveLink: {
        type: String,
    },
}, { timestamps: true });
const Projects = mongoose_1.default.model("Projects", projectsSchema);
exports.default = Projects;
