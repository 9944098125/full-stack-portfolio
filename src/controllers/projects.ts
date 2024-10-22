import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import Projects from "../models/projects";

export const createProject = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { title, description, techStack, images, githubLink, liveLink } =
			req.body;
		const { userId } = req.params;
		const newProject = new Projects({
			title,
			description,
			techStack,
			images,
			githubLink,
			liveLink,
		});
		await newProject.save();
		const user = await User.findOne({ _id: userId });
		user?.projects.push(newProject?._id);
		await user?.save();
		res.status(201).json({
			message: `Congrats ${
				user?.name?.split(" ")[0]
			}, you are registered Successfully !`,
			project: newProject,
		});
	} catch (err: any) {
		next(err);
	}
};
export const updateProject = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { projectId } = req.params;
		const { title, description, techStack, images, githubLink, liveLink } =
			req.body;
		const updatedProject = await Projects.findByIdAndUpdate(
			projectId,
			{
				title,
				description,
				techStack,
				images,
				githubLink,
				liveLink,
			},
			{ new: true }
		);
		res.status(200).json({
			message: `Your details have been updated successfully`,
			project: updatedProject,
		});
	} catch (err: any) {
		next(err);
	}
};
export const getProjects = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const projects = await Projects.find();
		res.status(200).json({
			message: "Projects fetched successfully",
			projects: projects,
		});
	} catch (err: any) {
		next(err);
	}
};
export const deleteProject = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { projectId } = req.params;
		await Projects.findByIdAndDelete(projectId);
		res.status(200).json({
			message: "Project deleted successfully",
		});
	} catch (err: any) {
		next(err);
	}
};
