
/*
 * Found this function online to take the form and call the function to create the table.
 *   The user is OxyDesign
 *   -http://stackoverflow.com/questions/26004342/javascript-multiplication-table
 *   -http://jsfiddle.net/OxyDesign/kb294v6a/
 *
 * */
$(document).ready(function(){
    buildTable();

    $('form').on('submit',function(e){
        e.preventDefault();
        buildTable();
    });

    //Got this from http://jqueryvalidation.org/digits-method
    jQuery.validator.setDefaults({
        debug: true,
        success: buildTable()
    });
    $( "#multTable" ).validate({
        rules: {
            r: {
                required: true,
                digits: true
            }
        },

    });




});


/*
 * This function resets the form values and then clicks the 'Make Table' button to reset the table.
 *
 * */
function resetForum(){
    document.getElementById("multTable").reset();
    document.getElementById("buildTable").click();
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

    document.getElementById("xLengthError").innerHTML = "";
    document.getElementById("yLengthError").innerHTML = "";
    /*
     * Create 4 variables taken from the forum.
     * */
    var yLength = parseInt($('input[name=r]').val()),
        xLength = parseInt($('input[name=c]').val()),
        xStart = parseInt($('input[name=ry]').val()),
        yStart = parseInt($('input[name=rx]').val());

    //Is never reached with jQuery validation being checked
    if( yLength > 50 || xLength > 50 ){

         /*Used this for errors but didn't like the popup
         alert("Please Enter Lengths Below 24");
         */

        /*
            These print errors statements next to the form selection that was too large.
        */
        /*if( xLength > 50 && yLength > 50 ){
            document.getElementById("xLengthError").innerHTML = "X Length Too Long Please Choose A Number Under 50";
            document.getElementById("yLengthError").innerHTML = "Y Length Too Long Please Choose A Number Under 50";
        }
        else if( yLength > 50 ){
            document.getElementById("yLengthError").innerHTML = "Y Length Too Long Please Choose A Number Under 50";
        }
        else if( xLength > 50 ){
            document.getElementById("xLengthError").innerHTML = "X Length Too Long Please Choose A Number Under 50";
        }*/
        yLength = 10;
        xLength = 10;
        resetForum();

    }
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