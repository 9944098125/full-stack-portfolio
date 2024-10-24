import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
		experienceSummary: {
			type: String,
			required: true,
		},
		technologiesWorkedOn: {
			type: [String],
			required: true,
		},
		responsibilities: {
			type: [String],
			required: true,
		},
	},
	{ timestamps: true }
);

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
