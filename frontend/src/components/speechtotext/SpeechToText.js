import React, { useState, useEffect, useRef } from 'react';
import './SpeechText.css'; // Import the CSS file for styles
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS

function SpeechToText({ setQuery }) {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const startRecording = () => {
    if (isRecording) return;

    setTranscript('');
    setIsRecording(true);

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.continuous = true;

    recognition.onstart = () => {
      console.log('Voice recognition started. Speak into the microphone.');
    };

    recognition.onresult = (event) => {
      const newTranscript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join(' ');

      setTranscript(prevTranscript => prevTranscript + ' ' + newTranscript);
      setQuery(prev => prev + ' ' + newTranscript); // Update the query state in Queries
      console.log('Transcription:', newTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Error occurred in recognition:', event.error);
    };

    recognition.onend = () => {
      if (isRecording) recognition.start();
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopRecording = () => {
    if (!isRecording || !recognitionRef.current) return;

    recognitionRef.current.stop();
    setIsRecording(false);
    console.log('Voice recognition stopped.');
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current && isRecording) {
        recognitionRef.current.stop();
      }
    };
  }, [isRecording]);

  return (
    <div className="speech-to-text">
      <button 
        className={`record-button ${isRecording ? 'recording' : ''}`} 
        onClick={isRecording ? stopRecording : startRecording}
      >
        <i className={`fa ${isRecording ? 'fa-stop' : 'fa-microphone'}`}></i>
      </button>
      {/* <p id="transcript">{transcript || 'Transcribed text will appear here.'}</p> */}
    </div>
  );
}

export default SpeechToText;
