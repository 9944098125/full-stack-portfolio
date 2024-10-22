import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import Experience from "../models/Experience";

export const createExperience = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const {
			company,
			role,
			startDate,
			endDate,
			experienceSummary,
			technologiesWorkedOn,
			responsibilities,
		} = req.body;
		const { userId } = req.params;
		const newExperience = new Experience({
			company,
			role,
			startDate,
			endDate,
			experienceSummary,
			technologiesWorkedOn,
			responsibilities,
		});
		await newExperience.save();
		const user = await User.findOne({ _id: userId });
		user?.experience.push(newExperience?._id);
		await user?.save();
		res.status(201).json({
			message: `Congrats ${
				user?.name?.split(" ")[0]
			}, you are registered Successfully !`,
			experience: newExperience,
		});
	} catch (err: any) {
		next(err);
	}
};
export const updateExperience = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { experienceId } = req.params;
		const {
			company,
			role,
			startDate,
			endDate,
			experienceSummary,
			technologiesWorkedOn,
			responsibilities,
		} = req.body;
		const updatedExperience = await Experience.findByIdAndUpdate(
			experienceId,
			{
				company,
				role,
				startDate,
				endDate,
				experienceSummary,
				technologiesWorkedOn,
				responsibilities,
			},
			{ new: true }
		);
		res.status(200).json({
			message: "Experience updated successfully",
			experience: updatedExperience,
		});
	} catch (err: any) {
		next(err);
	}
};
export const getExperiences = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const experiences = await Experience.find();
		res.status(200).json({
			message: "Experience fetched successfully",
			experiences: experiences,
		});
	} catch (err: any) {
		next(err);
	}
};
export const deleteExperience = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { experienceId } = req.params;
		await Experience.findByIdAndDelete(experienceId);
		res.status(200).json({
			message: "Experience deleted successfully",
		});
	} catch (err: any) {
		next(err);
	}
};
