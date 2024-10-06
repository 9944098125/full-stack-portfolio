import { Router } from "express";
import {
	createExperience,
	updateExperience,
	getExperiences,
	deleteExperience,
} from "../controllers/experiences";

const router = Router();

router.route("/:userId").post(createExperience);

router.route("/:experienceId").patch(updateExperience);

router.route("/").get(getExperiences);

router.route("/:experienceId").delete(deleteExperience);

export default router;
