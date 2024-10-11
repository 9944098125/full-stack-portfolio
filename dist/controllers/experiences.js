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
exports.deleteExperience = exports.getExperiences = exports.updateExperience = exports.createExperience = void 0;
const User_1 = __importDefault(require("../models/User"));
const Experience_1 = __importDefault(require("../models/Experience"));
const createExperience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { company, role, startDate, endDate, experienceSummary, technologiesWorkedOn, responsibilities, } = req.body;
        const { userId } = req.params;
        const newExperience = new Experience_1.default({
            company,
            role,
            startDate,
            endDate,
            experienceSummary,
            technologiesWorkedOn,
            responsibilities,
        });
        yield newExperience.save();
        const user = yield User_1.default.findOne({ _id: userId });
        user === null || user === void 0 ? void 0 : user.experience.push(newExperience === null || newExperience === void 0 ? void 0 : newExperience._id);
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(201).json({
            message: `Congrats ${(_a = user === null || user === void 0 ? void 0 : user.fullName) === null || _a === void 0 ? void 0 : _a.split(" ")[0]}, you are registered Successfully !`,
            experience: newExperience,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.createExperience = createExperience;
const updateExperience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { experienceId } = req.params;
        const { company, role, startDate, endDate, experienceSummary, technologiesWorkedOn, responsibilities, } = req.body;
        const updatedExperience = yield Experience_1.default.findByIdAndUpdate(experienceId, {
            company,
            role,
            startDate,
            endDate,
            experienceSummary,
            technologiesWorkedOn,
            responsibilities,
        }, { new: true });
        res.status(200).json({
            message: "Experience updated successfully",
            experience: updatedExperience,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.updateExperience = updateExperience;
const getExperiences = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const experiences = yield Experience_1.default.find();
        res.status(200).json({
            message: "Experience fetched successfully",
            experiences: experiences,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getExperiences = getExperiences;
const deleteExperience = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { experienceId } = req.params;
        yield Experience_1.default.findByIdAndDelete(experienceId);
        res.status(200).json({
            message: "Experience deleted successfully",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteExperience = deleteExperience;
