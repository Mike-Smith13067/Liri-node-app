require("dotenv").config();
const axios = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');


var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var search = process.argv.slice(3).join(" ");

console.log("command: " + command);
console.log("search term :" + search)


var startProgram = function (command, search) {
    inquirer.prompt([{
        type: "password",
        name: "password",
        message: "Please enter the password. (*LIRI*)",
        validate: function (input) {
            if (input === "LIRI") {
                return true;
            } else if (input === "") {
                return "Please enter the password (LIRI)"
            } else {
                return "Wrong- Try again!"
            }
        }
    }
    ]).then(function (input) {
        logText(input.password);
        inquirer.prompt([{
            type: "input",
            name: "name",
            message: "Please enter your name:",
        }
    ]).then
    })
    switch (command) {
        case "concert-this": getBands(search);
            break;
        case "spotify-this-song": getSpotify(search);
            break;
        case "movie-this": getMovie(search);
            break;
        case "do-what-it-says": doWhatItSays();
            break;
        default: console.log("I don't know what you are talking about");
    }
}

startProgram(command, search);

function getSpotify(songName) {
    if (songName == undefined) {
        songName = "Amarillo By Morning"
    }
    spotify.search(
        {
            type: 'track',
            query: songName,
            limit: 5
        },
        function (err, data) {
            if (err) {
                return console.log(err);
            }
            var songs = data.tracks.items
            //console.log(JSON.stringify(songs))
            for (var i = 0; i < songs.length; i++) {
                console.log("-----------------");
                console.log("artist name:" + songs[i].artists[0].name);
                console.log("song name: " + songs[i].name);
                console.log("preview link:" + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
            }
        });

}