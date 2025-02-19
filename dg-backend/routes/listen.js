const express = require('express');
const router = express.Router();
const { createClient, LiveTranscriptionEvents  } = require("@deepgram/sdk");
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY   
const deepgram = createClient(DEEPGRAM_API_KEY);
const fs = require('fs');
const multer  = require('multer');
const fetch = require('cross-fetch')


const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
  })
const upload = multer({ storage: storage });


router.get('/', async function(req, res){
    const { model, language, detect_language, smart_format, diarize, dictation, filler_words, measurements, numerals, paragraphs, profanity_filter, punctuate, utterances} = req.query;
    const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        {
          url: "https://dpgr.am/spacewalk.wav"
        },
        {
          model: model?model:"nova-3",
          detect_language: (detect_language === "true")?true:false,
          smart_format: (smart_format === "true")?true:false,
          diarize: (diarize === "true")?true:false,
          numerals: (numerals === "true")?true:false,
          punctuate: (punctuate === "true")?true:false,
          paragraphs: (paragraphs === "true")?true:false,
          utterances: (utterances === "true")?true:false,
        }
      );
      
      if (error) {
        console.error(error);
      }
      console.log(result);
      res.json(result)
});


router.get('/remote/:url', async function(req, res){
    const { model, language, detect_language, smart_format, diarize, dictation, filler_words, measurements, numerals, paragraphs, profanity_filter, punctuate, utterances} = req.query;
    url = decodeURIComponent(req.params.url)
    const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        {
          url: url
        },
        {
          model: model?model:"nova-3",
          language: language?language:'en',
          detect_language: (detect_language === "true")?true:false,
          diarize: (diarize === "true")?true:false,
          dictation: (dictation === "true")?true:false,
          filler_words: (filler_words === "true")?true:false,
          measurements: (measurements === "true")?true:false,
          numerals: (numerals === "true")?true:false,
          paragraphs: (paragraphs === "true")?true:false,
          profanity_filter: (profanity_filter === "true")?true:false,
          punctuate: (punctuate === "true")?true:false,
          smart_format: (smart_format === "true")?true:false,
          utterances: (utterances === "true")?true:false,
        }
      );
      
      if (error) {
        console.error(error);
      }
      console.log(result);
      res.json(result)
});


router.post('/upload', upload.single('file'), async (req, res) => {
    const { model, language, detect_language, smart_format, diarize, dictation, filler_words, measurements, numerals, paragraphs, profanity_filter, punctuate, utterances} = req.query;
    const { body, file } = req;
    try {
        if (!file.originalname) {
          throw Error(
            "Error: You need to choose a file to transcribe your own audio."
          );
        }
  
        filedir= "./uploads/"+file.originalname
        
        const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
            fs.readFileSync(filedir),
            {
              model: model?model:"nova-3",
              language: language?language:'en',
              detect_language: (detect_language === "true")?true:false,
              diarize: (diarize === "true")?true:false,
              dictation: (dictation === "true")?true:false,
              filler_words: (filler_words === "true")?true:false,
              measurements: (measurements === "true")?true:false,
              numerals: (numerals === "true")?true:false,
              paragraphs: (paragraphs === "true")?true:false,
              profanity_filter: (profanity_filter === "true")?true:false,
              punctuate: (punctuate === "true")?true:false,
              smart_format: (smart_format === "true")?true:false,
              utterances: (utterances === "true")?true:false,
            }
        );
        console.log(result);
        res.send({result});
      } catch (err) {
        console.log(err);
    
        // handle error
        res.status(500).send({ err: err.message ? err.message : err });
      }
    
  })

  
module.exports = router;