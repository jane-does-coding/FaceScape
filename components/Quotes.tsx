import React from "react";

const Quotes = () => {
	return (
		<div className="flex px-[2vw] mx-auto bg-neutral-950 pt-[15vh]">
			<img
				src="/img/google-ai.jpg"
				className="w-[30%] rounded-[1rem] mr-6 h-[80vh] object-cover"
				alt=""
			/>
			<div className="flex flex-col justify-between py-6 rounded-[1rem] items-center w-[35%] bg-neutral-800/50 text-white pr-6 mr-6 pl-6">
				<p className="text-[3.35vh] px-2">
					&quot;Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
					modi voluptatibus natus autem nobis quisquam voluptates commodi ad
					minus, saepe deleniti maiores dignissimos quos explicabo.
				</p>
				<div className="flex justify-between items-center w-full">
					<div className="w-full text-left mr-auto">
						<h3 className="text-[2.5vh] font-semibold">Lorem, ipsum.</h3>
						<p>Lorem, ipsum dolor.</p>
					</div>
					<img
						src="/banner2.jpg"
						className="w-[5rem] rounded-[0.75rem] h-[5rem] ml-auto object-cover"
						alt=""
					/>
				</div>
			</div>
			<div className="flex flex-col justify-between py-6 rounded-[1rem] pr-6 items-center w-[35%] bg-neutral-800/50 text-white pl-6">
				<p className="text-[3.35vh] px-2">
					&quot;Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
					modi voluptatibus natus autem nobis quisquam voluptates commodi ad
					minus.&quot;
				</p>
				<div className="flex justify-between items-center w-full">
					<div className="w-full text-left mr-auto">
						<h3 className="text-[2.5vh] font-semibold">Lorem, ipsum.</h3>
						<p>Lorem, ipsum dolor.</p>
					</div>
					<img
						src="/banner2.jpg"
						className="w-[5rem] rounded-[0.75rem] h-[5rem] ml-auto object-cover"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};

export default Quotes;
