import { Router } from "express";
import {
	createSkill,
	updateSkill,
	getSkills,
	deleteSkill,
} from "../controllers/skills";

const router = Router();

router.route("/:userId").post(createSkill);

router.route("/:skillId").patch(updateSkill);

router.route("/").get(getSkills);

router.route("/:skillId").delete(deleteSkill);

export default router;
