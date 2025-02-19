import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function UploadButton(props) {
    const fileInput = React.useRef();
    const onFileChange = event => {
      console.log("onfilechange")
      let uploadedFile = event.target.files[0];
      if (uploadedFile) {
        const formData = new FormData();
        if (uploadedFile.size > 0) {
          formData.append("file", uploadedFile);
        }
        console.log("submit request");

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
              // changeMessage("transcript found")

            }
            })
            .catch((error) => {
            // File upload failed
            console.log(error);
        });
      }
  };

    return (
    <Button
    variant="contained"
    color="primary"
    startIcon={<CloudUploadIcon />}
    onClick={()=>fileInput.current.click()}

    >
      Upload
      <input 
        type="file"
        ref={fileInput} 
        onChange={onFileChange} 
        hidden
      />
    </Button>


    );
  }