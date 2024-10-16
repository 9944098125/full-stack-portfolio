"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const skills_1 = require("../controllers/skills");
const router = (0, express_1.Router)();
router.route("/:userId").post(skills_1.createSkill);
router.route("/:skillId").patch(skills_1.updateSkill);
router.route("/").get(skills_1.getSkills);
router.route("/:skillId").delete(skills_1.deleteSkill);
exports.default = router;
