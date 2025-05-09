import { NextResponse } from "next/server";
import { GoogleGenAI, createUserContent } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const PRIMARY_EMOTIONS = [
	"happy",
	"sad",
	"neutral",
	"angry",
	"surprised",
	"fearful",
	"disgusted",
	"content",
	"amused",
];

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { imageBase64 } = body;

		const prompt = `Analyze the facial expression in this image and respond with:
    1. The primary emotion (must be one of: ${PRIMARY_EMOTIONS.join(", ")})
    2. Between 2 to 5 secondary emotions (comma-separated)
    Format your response exactly as: "Primary: [emotion], Secondary: [emotion1, emotion2, ...]"`;

		const contents = [
			{
				inlineData: {
					mimeType: "image/jpeg",
					data: imageBase64,
				},
			},
			{ text: prompt },
		];

		const response = await ai.models.generateContent({
			model: "gemini-1.5-flash",
			contents: createUserContent(contents),
		});

		const responseText = response.text;
		console.log(responseText);

		let primaryEmotion = "neutral";
		let secondaryEmotions: string[] = [];

		if (!responseText) return;

		const primaryMatch = responseText.match(/Primary:\s*([a-zA-Z]+)/i);
		const secondaryMatch = responseText.match(/Secondary:\s*([a-zA-Z,\s]+)/i);

		if (primaryMatch) {
			primaryEmotion = primaryMatch[1].toLowerCase();
			if (!PRIMARY_EMOTIONS.includes(primaryEmotion)) {
				primaryEmotion = "neutral";
			}
		}

		if (secondaryMatch) {
			secondaryEmotions = secondaryMatch[1]
				.split(",")
				.map((e) => e.trim().toLowerCase())
				.filter((e) => e && e !== primaryEmotion)
				.slice(0, 5); // Take up to 5 emotions

			// Ensure we have at least 2 emotions
			if (secondaryEmotions.length < 2) {
				// Fallback to some common secondary emotions
				const fallbackEmotions = [
					"content",
					"thoughtful",
					"engaged",
					"curious",
					"pensive",
				];
				secondaryEmotions = fallbackEmotions
					.filter((e) => e !== primaryEmotion)
					.slice(0, 2);
			}
		}

		return NextResponse.json({
			primaryEmotion,
			secondaryEmotions,
			fullResponse: responseText,
		});
	} catch (error) {
		console.error("Gemini API Error:", error);
		return NextResponse.json(
			{ error: "Failed to analyze image." },
			{ status: 500 }
		);
	}
}
