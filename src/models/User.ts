import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		},
		occupation: {
			type: String,
		},
		age: {
			type: Number,
		},
		resume: {
			type: String,
		},
		skills: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Skills",
			},
		],
		projects: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Projects",
			},
		],
		experience: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Experience",
			},
		],
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	const user = await User.findOne(); // Check if any user already exists
	if (user && this.isNew) {
		throw new Error("A user already exists. Only one user can be created.");
	}
	next();
});

const User = mongoose.model("User", userSchema);

export default User;
