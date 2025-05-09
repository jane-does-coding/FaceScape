"use client";
import { useState, useRef } from "react";
import Webcam from "react-webcam";

type Emotion =
	| "happy"
	| "sad"
	| "neutral"
	| "angry"
	| "surprised"
	| "fearful"
	| "disgusted"
	| "content"
	| "amused"
	| "concerned"
	| "annoyed"
	| "confused"
	| "excited"
	| "bored"
	| "disappointed";

export default function Home() {
	const [primaryEmotion, setPrimaryEmotion] = useState<Emotion>("neutral");
	const [secondaryEmotions, setSecondaryEmotions] = useState<string[]>([]);
	const [fullResponse, setFullResponse] = useState<string>("");
	const webcamRef = useRef<Webcam>(null);

	// Color mapping for emotions
	const bgColor = {
		happy: "bg-yellow-300",
		sad: "bg-blue-900",
		neutral: "bg-gray-800",
		angry: "bg-red-600",
		surprised: "bg-purple-500",
		fearful: "bg-orange-600",
		disgusted: "bg-green-800",
		content: "bg-teal-500",
		amused: "bg-pink-400",
		concerned: "bg-indigo-500",
		annoyed: "bg-amber-600",
		confused: "bg-cyan-600",
		excited: "bg-fuchsia-500",
		bored: "bg-stone-500",
		disappointed: "bg-rose-800",
	};

	const capture = async () => {
		const screenshot = webcamRef.current?.getScreenshot();
		if (screenshot) {
			try {
				const response = await fetch("/api/analyze", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ imageBase64: screenshot.split(",")[1] }),
				});

				const data = await response.json();
				if (data.primaryEmotion) {
					setPrimaryEmotion(data.primaryEmotion);
					setSecondaryEmotions(data.secondaryEmotions || []);
					setFullResponse(data.fullResponse || "");
				} else {
					console.error("Error analyzing emotion:", data.error);
					setPrimaryEmotion("neutral");
					setSecondaryEmotions([]);
				}
			} catch (error) {
				console.error("Error:", error);
				setPrimaryEmotion("neutral");
				setSecondaryEmotions([]);
			}
		}
	};

	return (
		<div
			className={`min-h-screen transition-colors duration-500 ${
				bgColor[primaryEmotion] || "bg-gray-800"
			} flex flex-col items-center justify-center text-white`}
		>
			<h1 className="text-4xl font-bold mb-6">Emotion Detection</h1>

			<div className="bg-black bg-opacity-50 p-6 rounded-lg mb-6 w-full max-w-md">
				<div className="text-center mb-4">
					<div className="text-2xl font-bold mb-2">Primary Emotion</div>
					<div className="text-3xl capitalize py-2 px-4 bg-white text-black bg-opacity-20 rounded-full inline-block">
						{primaryEmotion}
					</div>
				</div>

				{secondaryEmotions.length > 0 && (
					<div className="text-center">
						<div className="text-xl font-bold mb-2">Secondary Emotions</div>
						<div className="flex flex-wrap justify-center gap-2">
							{secondaryEmotions.map((emotion, index) => (
								<span
									key={index}
									className="capitalize px-3 py-1 bg-white text-black bg-opacity-20 rounded-full"
								>
									{emotion}
								</span>
							))}
						</div>
					</div>
				)}
			</div>

			<Webcam
				audio={false}
				ref={webcamRef}
				screenshotFormat="image/jpeg"
				width={480}
				height={360}
				className="rounded-lg border-4 border-white mb-6 shadow-xl"
			/>

			<button
				onClick={capture}
				className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg text-lg"
			>
				Analyze Emotion
			</button>

			{fullResponse && (
				<div className="mt-8 w-full max-w-2xl bg-black bg-opacity-50 p-4 rounded-lg">
					<div className="text-sm font-semibold mb-2">Full Analysis:</div>
					<div className="text-sm opacity-80">{fullResponse}</div>
				</div>
			)}
		</div>
	);
}
