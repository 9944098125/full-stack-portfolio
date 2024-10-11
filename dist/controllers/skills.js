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
exports.deleteSkill = exports.getSkills = exports.updateSkill = exports.createSkill = void 0;
const User_1 = __importDefault(require("../models/User"));
const Skills_1 = __importDefault(require("../models/Skills"));
const createSkill = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, level, image, experience } = req.body;
        const { userId } = req.params;
        const newSkill = new Skills_1.default({
            name,
            level,
            image,
            experience,
        });
        yield newSkill.save();
        const user = yield User_1.default.findOne({ _id: userId });
        user === null || user === void 0 ? void 0 : user.skills.push(newSkill === null || newSkill === void 0 ? void 0 : newSkill._id);
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(201).json({
            message: `Congrats ${(_a = user === null || user === void 0 ? void 0 : user.fullName) === null || _a === void 0 ? void 0 : _a.split(" ")[0]}, you have create a new skill Successfully !`,
            skill: newSkill,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createSkill = createSkill;
const updateSkill = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skillId } = req.params;
        const { name, level, image, experience } = req.body;
        const updatedSkill = yield Skills_1.default.findByIdAndUpdate(skillId, {
            name,
            level,
            image,
            experience,
        }, { new: true });
        res.status(200).json({
            message: `Your details have been updated successfully`,
            skill: updatedSkill,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateSkill = updateSkill;
const getSkills = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skills = yield Skills_1.default.find();
        res.status(200).json({
            message: "Skills fetched successfully",
            skills: skills,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getSkills = getSkills;
const deleteSkill = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skillId } = req.params;
        yield Skills_1.default.findByIdAndDelete(skillId);
        res.status(200).json({
            message: "Skill deleted successfully",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteSkill = deleteSkill;
