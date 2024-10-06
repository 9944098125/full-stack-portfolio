import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		level: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		experience: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Skills = mongoose.model("Skills", skillsSchema);

export default Skills;
