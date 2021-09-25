import { write } from 'fast-csv';
import { createWriteStream } from 'fs';
const ws = createWriteStream("listings.csv");

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
var metadata;
var listings =[];

$( document ).ready(function() {
    getNumListings({
        method: 'GET',
        url: 'https://openapi.etsy.com/v3/application/shops/6931850/listings/active'
    });

    //Wait for all the GET requests to finish before using final data
    setTimeout(() => {  
        console.log(metadata);
        console.log(listings);

        writeToCSV(metadata, listings);
    }, 3000);
});

function getNumListings(options) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function () {
        var phpResponse = JSON.parse(x.responseText);
        var numListings = phpResponse["count"];
        console.log(numListings);

        metadata = Object.keys(phpResponse["results"][0]);

        var numListingsLeft = numListings;
        var offset = 0;
        var urlString;
        do {
            urlString = 'https://openapi.etsy.com/v3/application/shops/6931850/listings/active?limit=100&offset=' + offset.toString();
            
            console.log(numListingsLeft);
            console.log(offset);
            console.log(urlString);

            doCORSRequest({
                method: 'GET',
                url: urlString,
            });
            numListingsLeft = numListingsLeft - 100;
            offset += 100;
        } while (numListingsLeft > 0)
    };

    x.setRequestHeader('x-api-key', 'sbz7vzg447solgzni8bfom7s');
    x.send(options.data);
}

function doCORSRequest(options) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function () {
        var phpResponse = JSON.parse(x.responseText);
        var output = phpResponse["results"];

        metadata = Object.keys(output[0]);

        for (var i = 0; i < output.length; i++) { 
            listings.push(output[i]);   //Append next 100 (or less) listings to array that tracks all listings
        }
    };

    x.setRequestHeader('x-api-key', 'sbz7vzg447solgzni8bfom7s');
    x.send(options.data);
}

function writeToCSV(metadata, listings) {
    write(listings, { headers: true })
        .pipe(ws);
}