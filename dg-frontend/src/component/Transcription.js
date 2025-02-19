import React from 'react';
import TextField from "@mui/material/TextField";


export default function Transcription(props) {
    return (
      <TextField
      label="Transcription"
      variant="outlined"
      className="transcripbox"
      value={props.transcriptionText}
      slotProps={{
        input: { readOnly: true },
      }}
      fullWidth 
      multiline
    />
    );
  }