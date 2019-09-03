require("dotenv").config();
//Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var fs = require("fs");


//instantiate Spotify
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret,
});

//var defaultSong = require("The Sign");
//var defaultMovie = "Mr. Nobody";
var spotify = new Spotify(keys.spotify);



/**
 * Name of the venue
Venue location
Date of the Event (use moment to format this as "MM/DD/YYYY")
 */
var action = process.argv[2];
logThis(action);
var value = process.argv[3];
logThis(value);

switch (action) {
  case "concert-this":
    getBands(value)
    break;

  case "spotify-this-song":
    //If user has not specified a song , use default
    spotifyThisSong(value)
    break;

  case "movie-this":
    getMovies(value);
    break;

  case "do-what-it-says":
    doWhatItSays()
    break;
}

function getBands(artist) {
  var artist = value;
  console.log("Artist input is"+artist);
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function (response) {

      var output = "";

      output+= "Name of the venue: "+ response.data[0].venue.name+"\n";
      output+= "Venue location: "+ response.data[0].venue.city+"\n";
      var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
      output+= "Date of the Event: "+ eventDate+"\n"
      console.log(output);
      logThis(output);

    })
    .catch(function (error) {
      console.log(error);
    });
}

function spotifyThisSong(songName) {
  // var songName = value;

  //If user has not specified a song , default to "The Sign" by Ace of Bass
  if (!songName) {
    songName = "I Saw the Sign";
  }

  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else {
    // The song's name
    //Artist(s)
    console.log("Artists: ", data.tracks.items[0].album.artists[0].name);
    // A preview link of the song from Spotify
    console.log("Preview Link: ", data.tracks.items[0].preview_url);
    // The album that the song is from
    console.log("Album Name: ", data.tracks.items[0].album.name);
  };
});
}

function getMovies(movieName) {
  if (!movieName) {
    movieName = "Mr. Nobody";
  }

  //var movieName = value;
  axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movieName)
    .then(function (data) {
      // console.log(data.data); 
      var results = `
      Title of the movie: ${data.data.Title}
      Year the movie came out: ${data.data.Year}
      IMDB Rating of the movie: ${data.data.Rated}
      Rotten Tomatoes Rating of the movie: ${data.data.Ratings[1].Value}
      Country where the movie was produced: ${data.data.Country}
      Language of the movie: ${data.data.Language}
      Plot of the movie: ${data.data.Plot}
      Actors in the movie: ${data.data.Actors}`;
      console.log(results)

      //console.log(data);
      // console.log("Name of the venue:", response.data[0].venue.name);
      // console.log("Venue location:", response.data[0].venue.city);
      // var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
      // console.log("Date of the Event:", eventDate);
    })
    .catch(function (error) {
      console.log(error);
    });
    //Response if user does not type in a movie title
    if (movieName === "Mr. Nobody") {
      console.log("-----------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");
  };
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
    if(err) {
      return console.log(err);
  }
    data = data.split(",");
    var action = data[0]
    var value = data[1]

      

    switch (action) {
      case "concert-this":
        getBands(value)
        break;
      case "spotify-this-song":
        spotifyThisSong(value)
        break;
      case "movie-this":
      getMovies(value)
        break;

    }
  });
};


function logThis(input) {
  //appends the commands in the log.  
  
  fs.appendFile("log.txt", input+"\n", function(err) {
  // If an error was experienced we will log it.
  if (err) {
    console.log(err);
  }
  // If no error is experienced, we'll log the phrase "Content Added" to our node console.
  else {
    console.log("Content Added!");
  }
  });
}


