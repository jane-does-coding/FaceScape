"use client";
import About from "@/components/About";
import AudioBtn from "@/components/AudioBtn";
import EmotionDetector from "@/components/EmotionDetector";
import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

export default function Home() {
	return (
		<div className="">
			<AudioBtn />
			<About />
			{/* <EmotionDetector /> */}
		</div>
	);
}
