import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import Skills from "../models/Skills";
import Projects from "../models/projects";
import Experience from "../models/Experience";

export const createUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { fullName, email, occupation, age, resume } = req.body;
		const newUser = new User({
			fullName,
			email,
			occupation,
			age,
			resume,
		});
		await newUser.save();
		res.status(201).json({
			message: `Congrats ${
				fullName?.split(" ")[0]
			}, you are registered Successfully !`,
			user: newUser,
		});
	} catch (err: any) {
		next(err);
	}
};
export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { userId } = req.params;
		const { fullName, email, occupation, age, resume } = req.body;
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				fullName,
				email,
				occupation,
				age,
				resume,
			},
			{ new: true }
		);
		res.status(200).json({
			message: `${
				fullName?.split(" ")[0]
			} your details have been updated successfully`,
			user: updatedUser,
		});
	} catch (err: any) {
		next(err);
	}
};
export const getBasicUserDetails = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = await User.findOne({ _id: req.params.userId });
		res.status(200).json({
			message: "User details fetched successfully",
			user: {
				fullName: user?.fullName,
				email: user?.email,
				occupation: user?.occupation,
				age: user?.age,
				resume: user?.resume,
			},
		});
	} catch (err: any) {
		next(err);
	}
};
