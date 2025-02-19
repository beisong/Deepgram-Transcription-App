
# dg-backend

This is a simple Node.js Express API that connects to the Deepgram SDK for audio transcription.

## Features

-   Upload an audio file for transcription
-   Retrieve the transcribed text
-   Uses Deepgram's Speech-to-Text API

## Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/)
-   [Deepgram API Key](https://console.deepgram.com/signup)

## Installation

1.  Clone the repository:
    
    ```sh
    git clone https://github.com/beisong/Deepgram-Transcription-App.git
    cd dg-backend
    
    ```
    
2.  Install dependencies:
    
    ```sh
    npm install
    
    ```
    
3.  Rename a the file `example.env to .env` file in the root directory and add your Deepgram API key:
    
    ```sh
    DEEPGRAM_API_KEY=your_api_key_here
    
    ```
    

## Usage

### Start the Server

Run the following command:

```sh
npm start

```

The API will be available at `http://localhost:3001`.

    
## Dockerizing the App

To build and run a docker image for the project, run the following command:

   `docker build -t dg-backend .`
   
You can run the docker image with the enviornment variable `-e DEEPGRAM_API_KEY='yourapikey'`
The image for the project is also available online at dockerhub at the following url.
https://hub.docker.com/repository/docker/3eisong/dg-backend/general



