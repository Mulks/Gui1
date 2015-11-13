/*
 * Found this function online to take the form and call the function to create the table.
 *   The user is OxyDesign
 *   -http://stackoverflow.com/questions/26004342/javascript-multiplication-table
 *   -http://jsfiddle.net/OxyDesign/kb294v6a/
 *
 * */


function submit (){
    //Got this from http://jqueryvalidation.org/digits-method

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

            },
            rx: {
                required: true,
                number: true
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

            },
            rx: {
                required: "Must have a number greater than or equal to 1",
                number: "Must be a number",

            }
        },
        errorPlacement: function(error, element) {
            error.insertAfter( element );
        },
        submitHandler: function() {
            console.log("Reached submitHandler")
            buildTable();
        }


    });
}


$(document).ready(function(){
    buildTable();

    console.log("Ready function reached");

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
