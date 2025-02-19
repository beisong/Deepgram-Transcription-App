const WebSocket = require('ws');
const { createClient, LiveTranscriptionEvents  } = require("@deepgram/sdk");
const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY   
const deepgram = createClient(DEEPGRAM_API_KEY);

let wss;

const fetch = require('cross-fetch')

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ noServer: true });

    server.on('upgrade', (request, socket, head) => {
        if (request.url === '/bbclive') {
            wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit('connection', ws, request);
            });
        } else {
            socket.destroy();
        }
    });

    wss.on('connection', (ws) => {
        console.log('Client connected to WebSocket');
        let started=false 
        let  live
        let url = 'http://stream.live.vc.bbcmedia.co.uk/bbc_world_service' 
        ws.on('message', (message) => {


            live = deepgram.listen.live({ model: "nova-3" });

            if(message.toString() === "start"){
            started=true
            }
            
            if(message.toString() === "stop"){
              started=false
              live.requestClose();
            }

            const controller = new AbortController();
            setTimeout(() => controller.abort(), 15000);
            fetch(url, {signal: controller.signal }).then(r => r.body).then(res => {
                res.on('readable', () => {
                  const data = res.read()
                  if((live.getReadyState() === 1) && started) {
                    live.send(data)
                  }    
                })
            })
          
            
            live.on(LiveTranscriptionEvents.Open, () => {
              live.on(LiveTranscriptionEvents.Transcript, (data) => {
                if (
                  data &&
                  data.channel &&
                  data.channel.alternatives &&
                  data.channel.alternatives[0] &&
                  data.channel.alternatives[0].transcript
                ) {
                  console.log(data.channel.alternatives[0].transcript);
                  ws.send(data.channel.alternatives[0].transcript);
                }
              });
            });
          
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
}


module.exports = { setupWebSocket };
