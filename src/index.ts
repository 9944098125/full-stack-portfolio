import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import userRoute from "./routes/user";
import skillsRoute from "./routes/skills";
import projectsRoute from "./routes/projects";
import experiencesRoute from "./routes/experiences";
import mongoose from "mongoose";

dotenv.config();

const app: Application = express();
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/skills", skillsRoute);
app.use("/api/projects", projectsRoute);
app.use("/api/experiences", experiencesRoute);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	const errStatus = (error as any).status || 500;
	const errMessage = error.message || "Something went wrong";
	res.status(errStatus).json({
		message: errMessage,
		success: false,
		stack: error.stack,
	});
});

async function connect() {
	try {
		await mongoose.connect(process.env.MONGO_URI!);
		console.log("Connected to MongoDB");
	} catch (err: any) {
		console.log(err.message);
		process.exit(1);
	}
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
	connect();
	console.log(`Server is running on http://localhost:${port}`);
});
