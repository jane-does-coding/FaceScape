"use client";
import About from "@/components/About";
import AudioBtn from "@/components/AudioBtn";
import { CodeBlockDemo } from "@/components/CodeBlock";
import EmotionDetector from "@/components/EmotionDetector";
import { FeaturesSectionDemo } from "@/components/Features";
import { GoogleGeminiEffectDemo } from "@/components/Grid";
import Pharagraph from "@/components/Word";

export default function Home() {
	const sampletext =
		"FaceScape is an interactive AI website  _image2_ that reacts to your emotions in real-time using your webcam. _image_ Watch background and content shift based on mood while learning how AI works. _image3_ It's easier to get started with AI than you think!";

	return (
		<div className="">
			<AudioBtn />
			<About />
			<Pharagraph value={sampletext} />
			<EmotionDetector />
			{/* 	<GetRepo /> */}
			{/* <Quotes /> */}
			<div className="bg-neutral-950 pb-[20vh] flex px-[10vw] gap-[5vw]">
				<div className="flex flex-col">
					<h1 className="text-white">Lorem, ipsum dolor.</h1>
					<p className="text-white">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Error a
						perspiciatis eos adipisci aliquid, officia quaerat! Ullam.
					</p>
				</div>
				<CodeBlockDemo />
			</div>

			<FeaturesSectionDemo />
			<GoogleGeminiEffectDemo />
			{/* <EmotionDetector /> */}
		</div>
	);
}
