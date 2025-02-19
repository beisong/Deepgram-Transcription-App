const express = require('express');
const router = express.Router();
const { createClient } = require("@deepgram/sdk");
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY  
const deepgram = createClient(DEEPGRAM_API_KEY);
const bodyParser = require('body-parser');

router.post('/', bodyParser.text({type: '*/*'}), async (req, res) => {
  const text = req.body
  const { intents, sentiment, summarize, topics} = req.query;
  try {
    const { result, error } = await deepgram.read.analyzeText(
      { text },
      { 
        intents: (intents === "true")?true:false,
        sentiment: (sentiment === "true")?true:false,
        language: "en" , 
        topics: (topics === "true")?true:false,  
        summarize: (summarize === "true")?"true":false}
    );
      console.log(result)
      res.send(result);
  } catch (err) {
    console.log(err);
    // handle error
    res.status(500).send({ err: err.message ? err.message : err });
  }
 
});

module.exports = router;