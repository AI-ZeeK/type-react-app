import React from "react";

type HangmanWordProps = {
	guessedLetters: string[];
	wordToGuess: string;
	reveal: boolean;
};

const HangmanWord = ({
	guessedLetters,
	wordToGuess,
	reveal = false,
}: HangmanWordProps) => {
	return (
		<div
			style={{
				display: "flex",
				gap: ".25em",
				fontSize: "6rem",
				textTransform: "uppercase",
				fontFamily: "monospace",
				color: "white",
			}}>
			{wordToGuess.split("").map((letter, index) => (
				<span
					style={{
						borderBottom: ".1em solid white",
						padding: " 0.4rem 0.4rem 2rem",
					}}
					key={index}>
					<span
						style={{
							visibility:
								guessedLetters.includes(letter) || reveal
									? "visible"
									: "hidden",
							color:
								!guessedLetters.includes(letter) && reveal ? "red" : "white",
						}}>
						{letter}
					</span>
				</span>
			))}
		</div>
	);
};

export default HangmanWord;
