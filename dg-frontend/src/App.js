import './App.css';
import React, { useState} from 'react';
import UploadButton from "./component/UploadButton"
import RecordButton from "./component/RecordButton"
import StreamButton from "./component/StreamButton"
import Transcription from "./component/Transcription"
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  boxShadow:'none',
  backgroundColor: 'transparent',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function App() {
  const [transcription, setTranscription] = useState("Transcription text.....");
      return (
        <div className="App">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Item><UploadButton setTranscription = {setTranscription}/></Item>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Item><RecordButton setTranscription = {setTranscription}/></Item>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Item><StreamButton  setTranscription = {setTranscription}/></Item>
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <Item><Transcription transcriptionText={transcription}></Transcription></Item>
            </Grid>
          </Grid>
        </div>  
  );
}

export default App;