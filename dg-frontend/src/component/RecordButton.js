import React from 'react';
import { useState, useEffect} from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import RecordIcon from '@mui/icons-material/KeyboardVoice';

export default function UploadButton(props) {
	const [isRecording, setIsRecording] = useState(false);
	const [audioStream, setAudioStream] = useState(null);
	const [mediaRecorder, setMediaRecorder] = useState(null);
  
	useEffect(() => {
		if (!audioStream) {
			navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
				setAudioStream(stream);
				const mediaRecorder = new MediaRecorder(stream);
				setMediaRecorder(mediaRecorder);
				let audio;

				mediaRecorder.ondataavailable = (event) => {
					if (event.data.size > 0) {
						audio = [event.data];
					}
				};

				mediaRecorder.onstop = (event) => {
					const blob = new Blob(audio, { type: "audio/wav" });
					const formData = new FormData();
					formData.append('file', blob);
					props.setTranscription("Processing...")
					// Send the file to the server
					axios.post('http://localhost:3001/listen/upload', formData)
						.then((response) => {
						// File upload successful
						console.log(response.data);
			if (
			response.data.result.results &&
			response.data.result.results.channels &&
			response.data.result.results.channels[0] &&
			response.data.result.results.channels[0].alternatives &&
			response.data.result.results.channels[0].alternatives[0] &&
			response.data.result.results.channels[0].alternatives[0].transcript
			) {
				let transcript = response.data.result.results.channels[0].alternatives[0].transcript;
				props.setTranscription(transcript);
			}
						})
						.catch((error) => {
						// File upload failed
						console.log(error);
					});
				};
			})
				.catch((error) => {
					console.error("Error accessing microphone:", error);
				});
			}
		
		}, [audioStream]);


  const startRecording = () => {
    navigator.permissions.query(
			{ name: 'microphone' }
		).then(function(permissionStatus){
			if(permissionStatus.state === 'denied'){
				alert("Please allow microphone access to start recording")
			}
			else{
				mediaRecorder.start();
				setIsRecording(true);
			}
		})
	};

	const stopRecording = () => {
		mediaRecorder.stop();
		setIsRecording(false);
	};

  const handleToggleRecording = (event) => {
		event.preventDefault();
		if (isRecording) {stopRecording();} 
		else {startRecording();}
	};
    return (

      <Button
        variant="contained"
        color="primary"
        startIcon={<RecordIcon/>}
				onClick={handleToggleRecording}>
        {isRecording ? "Stop Recording": "Start Recording"}
        </Button>
    );
  }