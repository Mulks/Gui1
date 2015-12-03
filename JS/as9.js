/**
 * Created by Cody on 12/2/2015.
 */


/*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely
 *    copied or excerpted for educational purposes with credit to the author.
 *  updated by JMH on November 21, 2015 at 10:27 AM
 *  updated by JMH on November 25, 2015 at 10:58 AM to add the blank tile
 *  updated by JMH on November 27, 2015 at 10:22 AM to add original-distribution
 */

var ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original" : 9,  "remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original" : 4,  "remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original" : 12, "remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original" : 3,  "remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original" : 9,  "remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original" : 1,  "remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original" : 1,  "remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original" : 4,  "remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original" : 6,  "remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original" : 8,  "remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original" : 1,  "remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original" : 6,  "remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original" : 4,  "remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original" : 6,  "remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original" : 4,  "remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original" : 1,  "remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original" : 2,  "remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original" : 1,  "remaining" : 1  } ;
ScrabbleTiles["["] = { "value" : 0,  "original" : 2,  "remaining" : 2  } ;


var playerRack = [];

var OriginalTableKeys = Object.keys( ScrabbleTiles ).length;

var rackKeys = Object.keys( playerRack ).length;





function printTiles(){
    for ( k = 0 ; k < OriginalTableKeys ; k++ ) {
        console.log(String.fromCharCode(65 + k) + " : " + ScrabbleTiles[ String.fromCharCode(65 + k) ][ "value" ]
            + " : " + ScrabbleTiles[ String.fromCharCode(65 + k) ][ "original" ]
            + " : " + ScrabbleTiles[ String.fromCharCode(65 + k) ][ "remaining"]);
    }
}

function randomTile(){
    return Math.floor((Math.random() * 27));
}

function buildRack(){
    var STARTING_TILE_MAX = 7;
    var rackCount = 1;



    var src;
    var id;
    var tileClass = "scrabbleTile";

    for( var i = 0; rackCount <= STARTING_TILE_MAX; i++){

        var randTile = randomTile();

        //console.log( "randTile : " + randTile );

        if( ScrabbleTiles[ String.fromCharCode(65 + randTile) ][ "remaining"] !== 0){

            playerRack[rackCount] = {"letter" : String.fromCharCode(65 + randTile),"value" : ScrabbleTiles[ String.fromCharCode(65 + randTile) ][ "value" ]};

            ScrabbleTiles[ String.fromCharCode(65 + randTile) ][ "remaining"]--;



            rackKeys = Object.keys( playerRack ).length;
            console.log("playerRack: Tile: " + ( rackCount ) + " Letter: " + playerRack[rackCount][ "letter" ] + " Value: " + playerRack[rackCount][ "value" ]);

            id = "tile" + rackCount;
            src = "../pics/scrabble/Scrabble_Tile_" + playerRack[rackCount][ "letter" ] + ".jpg";

            $('#playerRack').prepend($('<img>',{id:id,src:src,class:tileClass}));
            rackCount++;
        }
        /*console.log("Random Tile: " + String.fromCharCode(65 + randTile) + " : " + ScrabbleTiles[ String.fromCharCode(65 + randTile) ][ "value" ]
         + " : " + ScrabbleTiles[ String.fromCharCode(65 + randTile) ][ "original" ]
         + " : " + ScrabbleTiles[ String.fromCharCode(65 + randTile) ][ "remaining"]);
         */
    }
}

$(document).ready(function(){

    buildRack();


});
