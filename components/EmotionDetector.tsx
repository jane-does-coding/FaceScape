"use client";
import { useState, useRef, useEffect } from "react";
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

const EmotionDetector = () => {
	const [primaryEmotion, setPrimaryEmotion] = useState<Emotion>("neutral");
	const [secondaryEmotions, setSecondaryEmotions] = useState<string[]>([]);
	const [fullResponse, setFullResponse] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [pulse, setPulse] = useState<boolean>(false);
	const webcamRef = useRef<Webcam>(null);

	// Enhanced color mapping with gradients
	const emotionStyles = {
		happy: {
			bg: "bg-gradient-to-br from-yellow-100 to-yellow-300",
			text: "text-yellow-900",
			border: "border-yellow-400",
		},
		sad: {
			bg: "bg-gradient-to-br from-blue-100 to-indigo-300",
			text: "text-blue-100",
			border: "border-blue-600",
		},
		neutral: {
			bg: "bg-gradient-to-br from-gray-100 to-gray-300",
			text: "text-gray-200",
			border: "border-gray-500",
		},
		angry: {
			bg: "bg-gradient-to-br from-red-100 to-red-300",
			text: "text-red-100",
			border: "border-red-500",
		},
		surprised: {
			bg: "bg-gradient-to-br from-purple-100 to-purple-300",
			text: "text-purple-100",
			border: "border-purple-400",
		},
		fearful: {
			bg: "bg-gradient-to-br from-orange-100 to-orange-300",
			text: "text-orange-100",
			border: "border-orange-500",
		},
		disgusted: {
			bg: "bg-gradient-to-br from-green-100 to-green-300",
			text: "text-green-100",
			border: "border-green-700",
		},
		content: {
			bg: "bg-gradient-to-br from-teal-100 to-teal-300",
			text: "text-teal-100",
			border: "border-teal-400",
		},
		amused: {
			bg: "bg-gradient-to-br from-pink-100 to-pink-300",
			text: "text-pink-100",
			border: "border-pink-400",
		},
		concerned: {
			bg: "bg-gradient-to-br from-indigo-100 to-indigo-300",
			text: "text-indigo-100",
			border: "border-indigo-400",
		},
		annoyed: {
			bg: "bg-gradient-to-br from-amber-100 to-amber-300",
			text: "text-amber-100",
			border: "border-amber-500",
		},
		confused: {
			bg: "bg-gradient-to-br from-cyan-100 to-cyan-300",
			text: "text-cyan-100",
			border: "border-cyan-500",
		},
		excited: {
			bg: "bg-gradient-to-br from-fuchsia-100 to-fuchsia-300",
			text: "text-fuchsia-100",
			border: "border-fuchsia-400",
		},
		bored: {
			bg: "bg-gradient-to-br from-stone-100 to-stone-300",
			text: "text-stone-100",
			border: "border-stone-400",
		},
		disappointed: {
			bg: "bg-gradient-to-br from-rose-100 to-rose-300",
			text: "text-rose-100",
			border: "border-rose-700",
		},
	};

	const currentStyle = emotionStyles[primaryEmotion] || emotionStyles.neutral;

	useEffect(() => {
		if (isLoading) {
			const timer = setTimeout(() => setPulse(!pulse), 500);
			return () => clearTimeout(timer);
		}
	}, [pulse, isLoading]);

	const capture = async () => {
		const screenshot = webcamRef.current?.getScreenshot();
		if (screenshot) {
			setIsLoading(true);
			setPulse(true);
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
			} finally {
				setIsLoading(false);
			}
		}
	};

	return (
		<div
			className={`min-h-screen transition-all duration-700 bg-neutral-950 flex flex-col items-center justify-center py-12 px-4 `}
		>
			<div className="w-full max-w-[80vw] mx-auto">
				<div className="text-center mb-10">
					<h1 className="text-5xl font-bold mb-2 tracking-tight text-white">
						Emotion Detection
					</h1>
					<p className="text-xl opacity-80 text-white">
						Capture your current emotional state with AI
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
					{/* Webcam Section */}
					<div className="space-y-6">
						<div className="relative group">
							<Webcam
								audio={false}
								mirrored={true}
								ref={webcamRef}
								screenshotFormat="image/jpeg"
								className="rounded-xl border-4 border-white/70 shadow-2xl w-full h-[50vh] object-cover transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl"
							/>
							<div className="absolute inset-0 rounded-xl border-4 border-transparent group-hover:border-white/30 pointer-events-none transition-all duration-300" />
						</div>

						<button
							onClick={capture}
							disabled={isLoading}
							className={`w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
								isLoading
									? "bg-gray-400 cursor-not-allowed"
									: "bg-white text-gray-900 hover:bg-gray-100"
							}`}
						>
							{isLoading ? (
								<div className="flex items-center justify-center space-x-2">
									<span className="animate-pulse">Analyzing</span>
									<div className="flex space-x-1">
										<div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce" />
										<div
											className="w-2 h-2 bg-gray-700 rounded-full animate-bounce"
											style={{ animationDelay: "0.2s" }}
										/>
										<div
											className="w-2 h-2 bg-gray-700 rounded-full animate-bounce"
											style={{ animationDelay: "0.4s" }}
										/>
									</div>
								</div>
							) : (
								"Capture & Analyze"
							)}
						</button>
					</div>

					{/* Results Section */}
					<div className="space-y-6">
						<div
							className={`bg-black/30 backdrop-blur-sm p-8 rounded-xl border ${currentStyle.border} shadow-xl transition-all duration-500`}
						>
							<div className="text-center">
								<h2 className="text-2xl font-semibold mb-4 text-white">
									Primary Emotion
								</h2>
								<div
									className={`text-4xl font-bold capitalize py-4 px-8 rounded-full inline-block ${currentStyle.bg} ${currentStyle.border} border-2 shadow-md animate-pulse-once`}
								>
									{primaryEmotion}
								</div>
							</div>

							{secondaryEmotions.length > 0 && (
								<div className="mt-8">
									<h3 className="text-xl font-semibold mb-3 text-center text-white">
										Also Detected
									</h3>
									<div className="flex flex-wrap justify-center gap-3">
										{secondaryEmotions.map((emotion, index) => (
											<span
												key={index}
												className="capitalize px-4 py-2 bg-white/50 text-black font-semibold backdrop-blur-sm rounded-full border border-white/20 hover:scale-105 transition-all duration-200"
											>
												{emotion}
											</span>
										))}
									</div>
								</div>
							)}
						</div>

						{fullResponse && (
							<div
								className={`bg-black/30 backdrop-blur-sm p-6 rounded-xl border ${currentStyle.border} shadow-xl transition-all duration-500 overflow-hidden`}
							>
								<h3 className="text-xl font-semibold mb-3 text-white">
									Analysis Details
								</h3>
								<div className="text-sm opacity-90 leading-relaxed max-h-60 overflow-y-auto pr-2 custom-scrollbar text-white">
									{fullResponse}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="mt-12 text-center text-sm opacity-70">
				<p>Emotion Detection AI • {new Date().getFullYear()}</p>
			</footer>

			{/* Custom styles */}
			<style jsx>{`
				.animate-pulse-once {
					animation: pulse 1.5s ease-in-out;
				}
				@keyframes pulse {
					0%,
					100% {
						transform: scale(1);
					}
					50% {
						transform: scale(1.05);
					}
				}
				.custom-scrollbar::-webkit-scrollbar {
					width: 6px;
				}
				.custom-scrollbar::-webkit-scrollbar-track {
					background: rgba(255, 255, 255, 0.1);
					border-radius: 10px;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb {
					background: rgba(255, 255, 255, 0.3);
					border-radius: 10px;
				}
			`}</style>
		</div>
	);
};

export default EmotionDetector;
