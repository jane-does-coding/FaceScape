"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

const AudioBtn = () => {
	const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
	const [isIndicatorActive, setIsIndicatorActive] = useState<boolean>(false);

	const audioElementRef = useRef<HTMLAudioElement>(null);

	const toggleAudioIndicator = (): void => {
		setIsAudioPlaying((prev) => !prev);
		setIsIndicatorActive((prev) => !prev);
	};

	useEffect(() => {
		const audioElement = audioElementRef.current;
		if (!audioElement) return;

		const handlePlay = async () => {
			try {
				await audioElement.play();
			} catch (error) {
				console.error("Audio playback failed:", error);
				setIsAudioPlaying(false);
				setIsIndicatorActive(false);
			}
		};

		if (isAudioPlaying) {
			handlePlay();
		} else {
			audioElement.pause();
		}

		return () => {
			audioElement.pause();
		};
	}, [isAudioPlaying]);

	return (
		<div className="fixed top-6 right-8 z-50">
			<button
				onClick={toggleAudioIndicator}
				className="ml-10 flex items-center space-x-0.5"
			>
				<audio
					ref={audioElementRef}
					className="hidden"
					src="/audio/loop.mp3"
					loop
				/>
				{[1, 2, 3, 4].map((bar) => (
					<div
						key={bar}
						className={clsx("indicator-line", {
							active: isIndicatorActive,
						})}
						style={{
							animationDelay: `${bar * 0.1}s`,
						}}
					/>
				))}
			</button>
		</div>
	);
};

export default AudioBtn;
