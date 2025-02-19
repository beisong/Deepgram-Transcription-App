const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require("dotenv");
dotenv.config()
const wsRouter = require('./routes/ws'); // Import WebSocket router
const listenRoute = require('./routes/listen');
const speakRoute = require('./routes/speak');
const readRoute = require('./routes/read');

app.use(cors())
app.use('/listen', listenRoute);
app.use('/speak', speakRoute);
app.use('/read', readRoute);

app.get('/', (req, res) => {
    res.send('<h1>Deepgram</h1>');
});

const port = process.env.PORT || 3001; 

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

wsRouter.setupWebSocket(server); // Setup WebSocket
