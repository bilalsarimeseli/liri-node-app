# Liri-Bot (Language Interpretation & Recognition Interface)

## Objective

LIRI is a bot that receives commands from the CLI and outputs the response in the console and log.txt file. The user will be able to get information about song information within the Spotify library, upcoming concerts based on a specific artist in a town, and movie information within the OMDB (Open Movie Database).

Here are the screenshots of how to run the app, how to give the commands. 

concert-this:
![Concert This](/assets/images/concert.png)


## Technologies used:
* Spotify API
* OMDB API
* Bands In Town API
- Node.js
- Javascript
- NPM packages


### Commands for LIRI
* Concert-this
* Spotify-this-song
* Movie-this
* do-what-it-says

### SETUP

1. git clone https://github.com/bilalsarimeseli/liri-node-app
2. cd liri-node-app in your terminal
3. npm install 
4A. node liri.js spotify-this-song '<song name here>'
4B. node liri.js movie-this '<movie name here>'
4C. node liri.js do-what-it-says
4D. node liril.js concert-this '<artist name here>'
5. Review results in the log.txt file or console



