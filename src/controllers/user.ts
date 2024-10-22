import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

export const updateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { userId } = req.query;
		const { name, email, occupation, age, summary, image } = req.body;
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				name,
				email,
				occupation,
				age,
				summary,
				image,
			},
			{ new: true }
		);
		res.status(200).json({
			message: `${
				name?.split(" ")[0]
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
		const user = await User.findOne({ _id: req.query.userId });
		res.status(200).json({
			message: "User details fetched successfully",
			user: {
				name: user?.name,
				email: user?.email,
				occupation: user?.occupation,
				summary: user?.summary,
				age: user?.age,
				resume: user?.resume,
				image: user?.image,
			},
		});
	} catch (err: any) {
		next(err);
	}
};
export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email.toLowerCase() });
		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}
		if (user?.password !== password) {
			return res.status(401).json({
				message: "Invalid password",
			});
		}
		const token = jwt.sign(
			{ userId: user?._id },
			process.env.SECRET_TOKEN as string
		);
		res.status(200).json({
			message: "Login successful",
			user: {
				_id: user?._id,
				age: user?.age,
				resume: user?.resume,
				occupation: user?.occupation,
				name: user?.name,
				email: user?.email,
			},
			token: token,
		});
	} catch (err: any) {
		next(err);
	}
};
