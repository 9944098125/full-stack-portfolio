import { Router } from "express";
import {
	createProject,
	updateProject,
	getProjects,
	deleteProject,
} from "../controllers/projects";

const router = Router();

router.route("/:userId").post(createProject);

router.route("/:projectId").patch(updateProject);

router.route("/").get(getProjects);

router.route("/:projectId").delete(deleteProject);

export default router;
