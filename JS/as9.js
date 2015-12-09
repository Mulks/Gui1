/**
 *  Cody Mulkern
 *  Cody_mulkern@student.uml.edu
 *
 *  as9.js
 *
 *  Assignment 9: Implementing some of Scrabble
 *
 *  Created by Cody Mulkern December 1, 2015
 *  Updated by Cody Mulkern December 2, 2015
 */


/*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely
 *    copied or excerpted for educational purposes with credit to the author.
 *  updated by JMH on November 21, 2015 at 10:27 AM
 *  updated by JMH on November 25, 2015 at 10:58 AM to add the blank tile
 *  updated by JMH on November 27, 2015 at 10:22 AM to add original-distribution
 *
 *  Got Tiles and ScrabbleTiles array from Professor Heines Website
 *  @Link to array  https://teaching.cs.uml.edu/~heines/91.461/91.461-2015-16f/461-lecs/lecture26.jsp
 *  @Link to tiles  https://teaching.cs.uml.edu/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Tiles.zip
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

var playerScore = 0;

var tileExists = [false, false, false, false, false, false, false, false, false, false];


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
    var title;
    var tileClass = "scrabbleTile";

    $('#rackDiv div').empty();

    for( var i = 0; rackCount <= STARTING_TILE_MAX; i++){

        var randTile = randomTile();

        //console.log( "randTile : " + randTile );

        if( ScrabbleTiles[ String.fromCharCode(65 + randTile) ][ "remaining"] !== 0 && tilesLeft()){

            playerRack[rackCount] = {"letter" : String.fromCharCode(65 + randTile),"value" : ScrabbleTiles[ String.fromCharCode(65 + randTile) ][ "value" ]};

            ScrabbleTiles[ String.fromCharCode(65 + randTile) ][ "remaining"]--;



            rackKeys = Object.keys( playerRack ).length;
            console.log("playerRack: Tile: " + ( rackCount ) + " Letter: " + playerRack[rackCount][ "letter" ] + " Value: " + playerRack[rackCount][ "value" ]);

            id = "tile" + rackCount;
            title = playerRack[rackCount][ "letter" ];
            src = "../pics/scrabble/Scrabble_Tile_" + playerRack[rackCount][ "letter" ] + ".jpg";

            $('#playerRack').prepend($('<img>',{id:id,src:src,class:tileClass,title:title}));
            rackCount++;
        }
        if(tilesLeft() == false ){
            $('#tileButtonDiv').append("<p>No Tiles Left</p>");
            $("#newTileButton").prop("disabled",true);
            return;
        }
        /*console.log("Random Tile: " + String.fromCharCode(65 + randTile) + " : " + ScrabbleTiles[ String.fromCharCode(65 + randTile) ][ "value" ]
         + " : " + ScrabbleTiles[ String.fromCharCode(65 + randTile) ][ "original" ]
         + " : " + ScrabbleTiles[ String.fromCharCode(65 + randTile) ][ "remaining"]);
        */

        //printTiles();

        //$("#" + id).draggable({ snap: ".boardTile" });

        $("#" + id).draggable({ snap: ".boardTile", snapMode: "inner"});
        //$("#" + id).draggable({ grid: [10,10]});
        //console.log("Draggable: " + id );


    }

    //$(".scrabbleTile" ).draggable();


}

function tilesLeft(){

    var tileExists = false;
    var offSet = 0;

    while( offSet < 27 ){

        //console.log("offset: " + offSet);

        if(ScrabbleTiles[ String.fromCharCode(65 + offSet) ][ "remaining" ] !== 0){
            tileExists = true;
        }
        offSet++;
    }

    return tileExists;

}

function tileDropped(event, ui){



    if(tileExists[$(this).attr("id") -1] == false && $(this).attr("title") === 'doubleLetter'){
        playerScore += (ScrabbleTiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 2 );
    }
    else if(tileExists[$(this).attr("id") -1] == false && $(this).attr("title") === 'tripleLetter'){
        playerScore += (ScrabbleTiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 3 );
    }
    else if(tileExists[$(this).attr("id") -1] == false && $(this).attr("title") === 'blank'){
        playerScore += (ScrabbleTiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] );
    }
    else if(tileExists[$(this).attr("id") -1] == false && $(this).attr("title") === 'doubleWord'){

        playerScore = ((playerScore + ScrabbleTiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] ) * 2 );
    }

    tileExists[$(this).attr("id") -1 ] = true;

    updateScore();


    console.log("tile: " + ui.draggable.attr("title") + " dropped");
    console.log("tile: " + $(this).attr("title") + " caught");
    console.log("tile: " + $(this).attr("id") + " caught");
    console.log("TileExists: " + tileExists[$(this).attr("id") -1]);
}

function tileRemoved(event, ui){




    if(tileExists[$(this).attr("id") -1] == true && $(this).attr("title") === 'doubleLetter'){
        playerScore -= (ScrabbleTiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 2 );
    }
    else if(tileExists[$(this).attr("id") -1] == true && $(this).attr("title") === 'tripleLetter'){
        playerScore -= (ScrabbleTiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] * 3 );
    }
    else if(tileExists[$(this).attr("id") -1] == true && $(this).attr("title") === 'blank'){
        playerScore -= (ScrabbleTiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] );
    }
    else if(tileExists[$(this).attr("id") -1] == true && $(this).attr("title") === 'doubleWord'){
        playerScore = (( playerScore / 2) - (ScrabbleTiles[ String.fromCharCode(ui.draggable.attr("title").charCodeAt(0)) ][ "value" ] ));
    }

    tileExists[$(this).attr("id") -1 ] = false;

    updateScore();

    console.log("tile: " + ui.draggable.attr("id") + " removed");
    console.log("tile: " + $(this).attr("title") + " left");
    console.log("tile: " + $(this).attr("id") + " left");
    console.log("TileExists: " + tileExists[$(this).attr("id") -1]);

}

function updateScore(){

    $('#scoreSpan').text(playerScore);

}


$(document).ready(function(){

    buildRack();


    $(".boardTile").droppable({drop: tileDropped, out: tileRemoved});

});
