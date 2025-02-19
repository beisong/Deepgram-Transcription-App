const express = require('express');
const router = express.Router();
const { createClient } = require("@deepgram/sdk");
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY  
const deepgram = createClient(DEEPGRAM_API_KEY);
const fs = require('fs');
const bodyParser = require('body-parser');
const audioFilePath = "./output/output.wav"; // Path to save the audio file

const getAudio = async (text) => {
    // STEP 1: Make a requet and configure the request with options (such as model choice, audio configuration, etc.)
    const response = await deepgram.speak.request(
      { text },
      {
        model: "aura-asteria-en",
        encoding: "linear16",
        container: "wav",
      }
    );
  
    // STEP 2: Get the audio stream and headers from the response
    const stream = await response.getStream();
    const headers = await response.getHeaders();
    if (stream) {
      // STEP 3: Convert the stream to an audio buffer
      const buffer = await getAudioBuffer(stream);
      // STEP 4: Write the audio buffer to a file
      fs.writeFile(audioFilePath, buffer, (err) => {
        if (err) {
          console.error("Error writing audio to file:", err);
        } else {
          console.log("Audio file written to output.wav");
        }
      });
    } else {
      console.error("Error generating audio:", stream);
    }
  
    if (headers) {
      console.log("Headers:", headers);
    }
    return audioFilePath
  };
  
  // Helper function to convert the stream to an audio buffer
  const getAudioBuffer = async (response) => {
    const reader = response.getReader();
    const chunks = [];
  
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
  
      chunks.push(value);
    }
  
    const dataArray = chunks.reduce(
      (acc, chunk) => Uint8Array.from([...acc, ...chunk]),
      new Uint8Array(0)
    );
  
    return Buffer.from(dataArray.buffer);
  };
  


// Define a route
router.get('/', bodyParser.text({type: '*/*'}), async (req, res) => {
    filepath = await getAudio (req.body);
    res.download(filepath)
});

// export the router module so that server.js file can use it
module.exports = router;