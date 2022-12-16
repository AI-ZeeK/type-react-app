import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
import "./App.css";
import HangmanDrawing from "./components/HangmanDrawing";
import HangmanWord from "./components/HangmanWord";
import HangmanKeyboard from "./components/HangmanKeyboard";

const getWord = () => {
	return words[Math.floor(Math.random() * words.length)];
};
function App() {
	const [wordToGuess, setWordToGuess] = useState(() => {
		return words[Math.floor(Math.random() * words.length)];
	});

	const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
	const incorrectLetters = guessedLetters.filter((letter) => {
		if (!wordToGuess.includes(letter)) {
			return letter;
		}
	});
	const isLoser = incorrectLetters.length >= 6;
	const isWinner = wordToGuess
		.split("")
		.every((letter) => guessedLetters.includes(letter));

	console.log(isLoser, typeof isLoser);
	const addGuessedLetter = useCallback(
		(letter: string) => {
			if (guessedLetters.includes(letter) || isLoser || isWinner) {
				return;
			}

			setGuessedLetters((currentLetters) => [...currentLetters, letter]);
		},
		[guessedLetters, isLoser, isWinner]
	);
	console.log(incorrectLetters);
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key;

			if (!key.match(/^[a-z]$/)) {
				return;
			}

			e.preventDefault();
			addGuessedLetter(key);
		};
		document.addEventListener("keypress", handler);

		return () => {
			document.removeEventListener("keypress", handler);
		};
	}, [guessedLetters]);
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key;

			if (key !== "Enter") {
				return;
			}
			e.preventDefault();
			setGuessedLetters([]);
			setWordToGuess(getWord());
		};
		document.addEventListener("keypress", handler);

		return () => {
			document.removeEventListener("keypress", handler);
		};
	}, [guessedLetters]);

	return (
		<div
			style={{
				maxWidth: "800px",
				display: "flex",
				flexDirection: "column",
				gap: "2rem",
				margin: "0 auto",
				alignItems: "center",
			}}>
			<div style={{ fontSize: "2rem", textAlign: "center" }}>
				{isWinner && "Winner! - refresh to try again"}
				{isLoser && "Nice Try! - refresh to try again"}
			</div>
			<HangmanDrawing numberOfGuesses={incorrectLetters.length} />
			<HangmanWord
				reveal={isLoser}
				guessedLetters={guessedLetters}
				wordToGuess={wordToGuess}
			/>
			<div
				style={{
					alignSelf: "stretch",
				}}>
				<HangmanKeyboard
					activeLetters={guessedLetters.filter((letter) =>
						wordToGuess.includes(letter)
					)}
					inactiveLetters={incorrectLetters}
					addGuessedLetter={addGuessedLetter}
					disabled={isWinner || isLoser}
				/>
			</div>
		</div>
	);
}

export default App;
