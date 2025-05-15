import React from "react";
import { CodeBlockDemo } from "./CodeBlock";

const GetRepo = () => {
	return (
		<div className="h-[90vh] w-full bg-neutral-950 flex">
			<div className="w-1/2 flex flex-col px-[5vw]">
				<h2 className="text-white">Like the project?</h2>
				<h3 className="text-white">Follow these steps to clone the repo</h3>
				<CodeBlockDemo />
			</div>
			<div className="w-1/2 flex flex-col px-[5vw]">
				<h2 className="text-white">Wonder what it's built with?</h2>
			</div>
		</div>
	);
};

export default GetRepo;
