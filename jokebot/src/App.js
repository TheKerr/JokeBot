import './App.css';
import axios from 'axios';
import { useState } from "react";


function App() {

	const synth = window.speechSynthesis;
	const voices = synth.getVoices();
	const [curVoice, setCurVoice] = useState(voices[0]);

	const getJoke = () => {
		axios.get("https://official-joke-api.appspot.com/jokes/programming/random").then((response) => {
			const data = response.data[0];
			const setup = data.setup;
			const punchline = data.punchline;

			let setupUtterance = new SpeechSynthesisUtterance(setup);
			let punchlineUtterance = new SpeechSynthesisUtterance(punchline);

			//the utterances are assigned the voice
			setupUtterance.voice = curVoice;
			punchlineUtterance.voice = curVoice;
			
			synth.speak(setupUtterance);
			synth.speak(punchlineUtterance);
		})
	}

	const changeVoice = (selection) => {
		const newVoice = voices.find((voice) => voice.name === selection);
		setCurVoice(newVoice);
	}


  return (
    <div className="App">
      <header className="App-header">
      </header>
	  <section className="main">
		<img className="robot-img" alt="dancing-robot" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDkxNzA5MDJmNDZkOTQ5ZmQzMzUyMTVkOTExNzNkYTcxYmNhZTNmZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/1HLwdFTwyndh6/giphy.gif" />
		<button className="joke-button" onClick={getJoke}>Tell me a joke</button>
		<select className="voices" onChange={(e) => changeVoice(e.target.value)}>
			{voices.map((voice) => {
				return (
					<option key={voice.name}>{voice.name}</option>
				)
			})}
		</select>
	  </section>
    </div>
  );
}

export default App;
