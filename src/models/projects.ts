import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		techStack: {
			type: [String],
			required: true,
		},
		images: {
			type: [String],
			required: true,
		},
		githubLink: {
			type: String,
			required: true,
		},
		liveLink: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Projects = mongoose.model("Projects", projectsSchema);

export default Projects;
