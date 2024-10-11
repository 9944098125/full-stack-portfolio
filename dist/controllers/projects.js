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
exports.deleteProject = exports.getProjects = exports.updateProject = exports.createProject = void 0;
const User_1 = __importDefault(require("../models/User"));
const projects_1 = __importDefault(require("../models/projects"));
const createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, description, techStack, images, githubLink, liveLink } = req.body;
        const { userId } = req.params;
        const newProject = new projects_1.default({
            title,
            description,
            techStack,
            images,
            githubLink,
            liveLink,
        });
        yield newProject.save();
        const user = yield User_1.default.findOne({ _id: userId });
        user === null || user === void 0 ? void 0 : user.projects.push(newProject === null || newProject === void 0 ? void 0 : newProject._id);
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(201).json({
            message: `Congrats ${(_a = user === null || user === void 0 ? void 0 : user.fullName) === null || _a === void 0 ? void 0 : _a.split(" ")[0]}, you are registered Successfully !`,
            project: newProject,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createProject = createProject;
const updateProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const { title, description, techStack, images, githubLink, liveLink } = req.body;
        const updatedProject = yield projects_1.default.findByIdAndUpdate(projectId, {
            title,
            description,
            techStack,
            images,
            githubLink,
            liveLink,
        }, { new: true });
        res.status(200).json({
            message: `Your details have been updated successfully`,
            project: updatedProject,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateProject = updateProject;
const getProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield projects_1.default.find();
        res.status(200).json({
            message: "Projects fetched successfully",
            projects: projects,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getProjects = getProjects;
const deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        yield projects_1.default.findByIdAndDelete(projectId);
        res.status(200).json({
            message: "Project deleted successfully",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteProject = deleteProject;
