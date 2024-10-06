import express from "express";
import {
	createUser,
	getBasicUserDetails,
	updateUser,
} from "../controllers/user";

const router = express.Router();

router.route("/createUser").post(createUser);

router.route("/getUserDetails").get(getBasicUserDetails);

router.route("/:userId").patch(updateUser);

export default router;
