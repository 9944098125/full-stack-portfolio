"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.route("/login").post(user_1.login);
router.route("/getUserDetails").get(user_1.getBasicUserDetails);
router.route("/:userId").patch(user_1.updateUser);
exports.default = router;
