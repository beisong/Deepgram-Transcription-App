import React from 'react';
import Button from '@mui/material/Button';
import { useState} from "react";
import StreamIcon from '@mui/icons-material/SettingsInputAntenna';

let audioplayer = new Audio('http://stream.live.vc.bbcmedia.co.uk/bbc_world_service');

export default function StreamButton(props) {
  const [isStreaming, setIsStreaming] = useState(false);
  
  const handleToggleStream = (event) => {
    const socket = new WebSocket("ws://localhost:3001/bbclive")
		event.preventDefault();
		if (isStreaming) {
      setIsStreaming(false);
      playaudio(false);
      stop(socket)
		} else {
			setIsStreaming(true);
      props.setTranscription("Processing...")
      playaudio(true);
      start(socket)
		}
	};


  const playaudio = (start) => {
    if(start)
    {
      audioplayer.load(); //load the new source
      audioplayer.play();
    }
    else{
      audioplayer.pause();
      audioplayer.currentTime = 0;
    }
	};
  const start = (socket)=>{
      socket.addEventListener("open", async () => {
        console.log("client: connected to server");
      });
    
      socket.addEventListener("message", event =>{
        props.setTranscription(event.data)
      })
  
      socket.onopen = () => socket.send('start');
  }

  const stop = (socket)=>{
      socket.onopen = () => socket.send('stop');
      socket.close();
  }

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<StreamIcon/>}
      onClick={handleToggleStream}
    >
    {isStreaming ? "Stop Stream" : "Livestream BBC"}
    </Button>    
  );
}