import express from "express";
import { getBasicUserDetails, login, updateUser } from "../controllers/user";

const router = express.Router();

router.route("/login").post(login as express.RequestHandler);

router.route("/getUserDetails").get(getBasicUserDetails);

router.route("/:userId").patch(updateUser);

export default router;
