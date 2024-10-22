import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import Skills from "../models/Skills";

export const createSkill = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name, level, image, experience } = req.body;
		const { userId } = req.params;
		const newSkill = new Skills({
			name,
			level,
			image,
			experience,
		});
		await newSkill.save();
		const user = await User.findOne({ _id: userId });
		user?.skills.push(newSkill?._id);
		await user?.save();
		res.status(201).json({
			message: `Congrats ${
				user?.name?.split(" ")[0]
			}, you have create a new skill Successfully !`,
			skill: newSkill,
		});
	} catch (err: any) {
		next(err);
	}
};
export const updateSkill = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { skillId } = req.params;
		const { name, level, image, experience } = req.body;
		const updatedSkill = await Skills.findByIdAndUpdate(
			skillId,
			{
				name,
				level,
				image,
				experience,
			},
			{ new: true }
		);
		res.status(200).json({
			message: `Your details have been updated successfully`,
			skill: updatedSkill,
		});
	} catch (err: any) {
		next(err);
	}
};
export const getSkills = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const skills = await Skills.find();
		res.status(200).json({
			message: "Skills fetched successfully",
			skills: skills,
		});
	} catch (err: any) {
		next(err);
	}
};
export const deleteSkill = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { skillId } = req.params;
		await Skills.findByIdAndDelete(skillId);
		res.status(200).json({
			message: "Skill deleted successfully",
		});
	} catch (err: any) {
		next(err);
	}
};
