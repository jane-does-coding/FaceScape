import { cn } from "@/lib/utils";

import {
	TbMoodSmile,
	TbRobot,
	TbDeviceLaptop,
	TbCurrencyDollarOff,
	TbCode,
	TbLayoutDashboard,
	TbStars,
	TbBook,
} from "react-icons/tb";
import { FaEarthAmericas } from "react-icons/fa6";

export function FeaturesSectionDemo() {
	const features = [
		{
			title: "Emotion-Based UI",
			description:
				"Background and music adapt in real-time to your facial mood using AI.",
			icon: <TbMoodSmile size={24} />,
		},
		{
			title: "Interactive AI Demo",
			description:
				"See Gemini AI in action by letting it read your mood and explain how.",
			icon: <TbRobot size={24} />,
		},
		{
			title: "No Extra Hardware Needed",
			description:
				"Just your face and a webcam. Works on laptops and phones, no downloads.",
			icon: <TbDeviceLaptop size={24} />,
		},
		{
			title: "Access Source Code",
			description:
				"This project is fully open-source and uses only free tools and APIs.",
			icon: <FaEarthAmericas size={24} />,
		},
		{
			title: "Built With Developers in Mind",
			description:
				"Explore the code, techstack, and live examples—perfect for learning AI+Web.",
			icon: <TbCode size={24} />,
		},
		{
			title: "Minimalist UI/UX",
			description:
				"The interface is clean, responsive, and optimized for all screen sizes.",
			icon: <TbLayoutDashboard size={24} />,
		},
		{
			title: "Powered by Gemini AI",
			description:
				"Gemini reads your expressions and powers the entire experience.",
			icon: <TbStars size={24} />,
		},
		{
			title: "Learn As You Explore",
			description:
				"FaceScape teaches you how the tech works in real-time while you interact.",
			icon: <TbBook size={24} />,
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 px-[3vw] mx-auto bg-neutral-900">
			{features.map((feature, index) => (
				<Feature key={feature.title} {...feature} index={index} />
			))}
		</div>
	);
}

const Feature = ({
	title,
	description,
	icon,
	index,
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
	index: number;
}) => {
	return (
		<div
			className={cn(
				"flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
				(index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
				index < 4 && "lg:border-b dark:border-neutral-800 "
			)}
		>
			{index < 4 && (
				<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
			)}
			{index >= 4 && (
				<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
			)}
			<div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
				{icon}
			</div>
			<div className="text-lg font-bold mb-2 relative z-10 px-10">
				<div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-yellow-500 transition-all duration-200 origin-center" />
				<span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
					{title}
				</span>
			</div>
			<p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
				{description}
			</p>
		</div>
	);
};
