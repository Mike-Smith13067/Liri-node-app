require("dotenv").config();
const axios = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');
const moment = require('moment');

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
        ]).then(function (input) {
            logText(input.name);
            inquirer.prompt([{
                type: "confirm",
                name: "choice",
                message: "Hello " + input.name + "! Type your choise 'concert-this', 'movie-this', 'spotify-this-song', and the appropriate title"

            }
            ]).then(function choice(input) {
                logText(input.choice);
                var userChoice = input.command;
                var userArray = userChoice.split(" ");
                var selection = userArray[0];
                var search = userArray.slice(1).join("+");
                if (choice === "movie-this") {
                    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy")
                        .then(function (response) {
                            console.log("\n***********Movie***********\n\n");
                            console.log("Title: " + response.data.Title + "\nYear: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors and Actresses: " + response.data.Actors);
                            return getChoice();
                        });
                } else if (choice === "concert-this") {
                    axios.get("https://rest.bandsintown.co/artists/" + search + "/events?app_id=codingbootcamp")
                        .then(function (response) {
                            console.log("\n***********Concerts***********\n\n");
                            console.log("\nVenue Name: " + events[i], venue.name + "\nLocation: " + events[i].venue.city + "," + events[i].venue.country + "\nDate: " + SVGAnimateMotionElement(events[i].venuew.datetime).format("MM/DD/YYYY"));
                            return getChoice();
                        });
                } else {
                    console.log("****************");
                    console.log("No upcoming events for your choice.");
                    return getChoice();
                }
            });

        }else if (choice === "spotify-this-song") {
            spotify.search({
                type: "track",
                query: search,
                limit: 1

            }, function (err, data) {
                if (err) {
                    console.log("Error:" + err);
                    return getChoice();
                } else {
                    var songTitle = data.tracks.items
                    for (var i = 0; i < songTitle.length; i++) {
                        console.log("***************Song************");
                        var songData = song[i].artists;
                        for (varj = 0; j < songData.length; j++); {
                            if (songData.length > 1) {
                                var songList = songData[j].name;
                                console.log(songList);
                            } else {
                                console.log(songData[j].name);
                            }
                        }
                        console.log("Title: " + song[i].name + "\nLink: " + song[i].preview_url + "\nAlbum: " + song[i].album.name);
                        return getChoice();
                    }
                }
            })
        } else if (choice === "do-what-it-says") {
            fs.readFile("random.txt", "utf8", function (error, data) {
                var dataArray = data.split(",".join(" ");
                if (error) {
                    console.log(error);
                    return getChoice();
                }else if (command === ""){
                    return;
                }else {
                    console.log ("Invalid command= Try again");
                    return getChoice();
                }
        });
}
