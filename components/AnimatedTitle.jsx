import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
	const containerRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const titleAnimation = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: "100 bottom",
					end: "center bottom",
					toggleActions: "play none none reverse",
				},
			});

			titleAnimation.to(
				".animated-word",
				{
					opacity: 1,
					transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
					ease: "power2.inOut",
					stagger: 0.02,
				},
				0
			);
		}, containerRef);

		return () => ctx.revert(); // Clean up on unmount
	}, []);

	return (
		<div
			ref={containerRef}
			className={clsx(
				"flex flex-col gap-1 text-7xl uppercase leading-[.8] text-white sm:px-32 md:text-[4rem]",
				containerClass
			)}
		>
			{title.split("<br />").map((line, index) => (
				<div
					key={index}
					className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
				>
					{line.split(" ").map((word, idx) => (
						<span
							key={idx}
							className="animated-word special-font font-zentry font-black opacity-0"
							dangerouslySetInnerHTML={{ __html: word }}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default AnimatedTitle;
