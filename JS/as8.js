/*
 * Found this function online to take the form and call the function to create the table.
 *   The user is OxyDesign
 *   -http://stackoverflow.com/questions/26004342/javascript-multiplication-table
 *   -http://jsfiddle.net/OxyDesign/kb294v6a/
 *
 * */


function submit (){

    /*
     When submit fucntion is called it will validate the form.
     I built this using one of the demos from the http://jqueryvalidation.org website
     and changing it to what I needed by either adding or deleting rules and messages.
     http://jqueryvalidation.org/files/demo/milk/
     view-source:http://jqueryvalidation.org/files/demo/milk/


     Lengths have:
     -required
     -digits used digits because it cannot be negative
     -min 1
     -max 50

     Starts have:
     -required
     -number used number because these can be negative
     -min (-1000000)
     -max 1000000

     */
    $( "#multTable" ).validate({
        rules: {
            r: {
                required: true,
                digits: true,
                min: {
                    param: 1
                },
                max: {
                    param: 50
                }
            },
            c: {
                required: true,
                digits: true,
                min: {
                    param: 1
                },
                max: {
                    param: 50
                }
            },
            ry: {
                required: true,
                number: true,
                min: {
                    param: -1000000
                },
                max: {
                    param: 1000000
                }

            },
            rx: {
                required: true,
                number: true,
                min: {
                    param: -1000000
                },
                max: {
                    param: 1000000
                }
            }
        },
        messages: {
            r: {
                required: "Must have a number greater than or equal to 1",
                digits: "Must be a number",
                min: "Must be greater than equal to 1",
                max: "Must be less than or equal to 50"
            },
            c: {
                required: "Must have a number greater than or equal to 1",
                digits: "Must be a number",
                min: "Must be greater than equal to 1",
                max: "Must be less than or equal to 50"
            },
            ry: {
                required: "Must have a number greater than or equal to 1",
                number: "Must be a number",
                min: "Must be greater than equal to -1000000",
                max: "Must be less than or equal to 1000000"

            },
            rx: {
                required: "Must have a number greater than or equal to 1",
                number: "Must be a number",
                min: "Must be greater than equal to -1000000",
                max: "Must be less than or equal to 1000000"

            }
        },
        errorPlacement: function(error, element) {

            //Places the error next to the element with the error.
            error.insertAfter( element );
        },
        submitHandler: function() {

            //Test to see if this function is reached.
            console.log("Reached submitHandler")
            buildTable();
        }


    });
}

/*



 */


$(document).ready(function(){

    //Builds the table initially when page is loaded.
    buildTable();

    //Test to see this is reached when loaded.
    console.log("Ready function reached");

    //Validate the form.
    submit();





});


/*
 * This function resets the form values and then clicks the 'Make Table' button to reset the table.
 *
 * */
function resetForum(){
    console.log("resetForm function reached");
    document.getElementById("multTable").reset();
    buildTable();
}


/*
 * This function builds the multiplication table.
 *
 *   The base of this function was found at:
 *       The user is OxyDesign
 *       -http://stackoverflow.com/questions/26004342/javascript-multiplication-table
 *       -http://jsfiddle.net/OxyDesign/kb294v6a/
 *
 *   There was a for loop to build a table, and I had to:
 *       -Take 4 variables not 2
 *       -Needed to be able to start the table at arbitrary values in either direction.
 *
 *   The only parts left from the example I found was the IF statement the two forloop statements and the $('#table').html(table).
 *
 * */
function buildTable(){

    //Test to see if this function is reached.
    console.log("Reached buildTable");
    submit();

    //document.getElementById("xLengthError").innerHTML = "";
    //document.getElementById("yLengthError").innerHTML = "";
    /*
     * Create 4 variables taken from the forum.
     * */
    var yLength = parseInt($('input[name=r]').val()),
        xLength = parseInt($('input[name=c]').val()),
        xStart = parseInt($('input[name=ry]').val()),
        yStart = parseInt($('input[name=rx]').val());



    /*
     * Use dx and dy to hold values passed in and be able to change them without
     * affecting the original values so these can be reset when needed.
     *
     * firstPassX - is used to test if it is in the top x row and print the values that were specified by user.
     *
     * firstPassY - is used to test for the first cell in the table and if true make it blank.
     *
     * secondPassY - is used to test for second row of the table because dy should not
     * get incremented before that or the table will be off by 1.
     *
     *
     * */
    var dx = xStart;
    var dy = yStart;
    var firstPassX = true;
    var firstPassY = true;
    var secondPassY = true;


    if(typeof yLength === 'number' && yLength > 0 && typeof xLength === 'number' && xLength > 0){
        var table = '<table>';
        table += '<tbody>';
        for(var i = 0; i <= yLength; i++){
            var y1col = true;
            dx = xStart;
            table += '<tr>';
            for(var j = 0; j <= xLength; j++){

                /*Test for first cell in table if true leave blank.*/
                if( firstPassY == true ){
                    table += '<td class="emptyCell">'+"  "+'</td>';
                    firstPassY = false;
                }
                /*Test for first row to populate given values.*/
                else if( firstPassX == true){
                    table += '<td class="topRow">'+dx+'</td>';
                    dx++;
                }
                /*Fill in all other table values.*/
                else{
                    /*Test for the first column to populate given values.*/
                    if( y1col == true){
                        table += '<td>'+dy+'</td>';
                        y1col = false;
                    }
                    /*Needed this to fix my off by 1. Was production a extra column after the first row.*/
                    if( j != xLength ){
                        table += '<td>'+dx*dy+'</td>';
                    }
                    dx++;
                }


            }
            firstPassX = false;
            table += '</tr>';

            /*Needed this to only increment the y after the first row because it was left blank in first row.*/
            if( secondPassY == false ){
                dy++;
            }
            /*After first row make false to start incrementing y.*/
            secondPassY = false;
        }
        table += '</tbody>';
        table += '</table>';
        $('#table').html(table);
    }
}
