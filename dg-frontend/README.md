
# dg-frontend
This is a React-based frontend applicationW that does audio transcription using deepgram api

## Features

-   Upload audio files for transcription.
-   Record audio and send it for transcription.
-   Stream live audio for real-time transcription.

## Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/)
-   Deepgram API Key (used in the backend)
-   A running instance of the  dg-backend server

## Installation

1.  Clone the repository:
    
    ```sh
    
		git clone https://github.com/beisong/Deepgram-Transcription-App.git
		cd dg-frontend
    ```
    
2.  Install dependencies:
    
    ```sh
    npm install
    
    ```
  
    

## Usage

### Start the Application

Run the following command:

```sh
npm start

```

The application will be available at `http://localhost:3000`.

## Dockerizing the App

To build and run a docker image for the project, run the following command:

   `docker build -t dg-frontend .`
   
The image for the project is also available online at dockerhub at the following url.
https://hub.docker.com/repository/docker/3eisong/dg-frontend/general
