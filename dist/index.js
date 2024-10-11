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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
const skills_1 = __importDefault(require("./routes/skills"));
const projects_1 = __importDefault(require("./routes/projects"));
const experiences_1 = __importDefault(require("./routes/experiences"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/api/user", user_1.default);
app.use("/api/skills", skills_1.default);
app.use("/api/projects", projects_1.default);
app.use("/api/experiences", experiences_1.default);
app.use((error, req, res, next) => {
    const errStatus = error.status || 500;
    const errMessage = error.message || "Something went wrong";
    res.status(errStatus).json({
        message: errMessage,
        success: false,
        stack: error.stack,
    });
});
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(process.env.MONGO_URI);
            console.log("Connected to MongoDB");
        }
        catch (err) {
            console.log(err.message);
            process.exit(1);
        }
    });
}
const port = process.env.PORT || 5000;
app.listen(port, () => {
    connect();
    console.log(`Server is running on http://localhost:${port}`);
});
