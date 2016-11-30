// // function to input amount of rows/columns before game starts
// var counter = 1;
// var limit = 2;
// function addInput(divName){
//      if (counter == limit)  {
//           alert("You have reached the limit of adding " + counter + " inputs");
//      }
//      else {
//           var newdiv = document.createElement('div');
//           newdiv.innerHTML = "Entry " + (counter + 1) + " <br><input type='text' name='myInputs[]'>";
//           document.getElementById(divName).appendChild(newdiv);
//           counter++;
//      }
// }



function createTable(){
    current_seconds = 0
    var rows = 10
    var cols = 20

    var $table = $("<table>")
    $table.attr("id", "lifeboard")
    $("#gameboard").empty()
    $("#gameboard").append($table)
    for(var row = 0; row < rows; row++){
        var $row = $("<tr>")
        $table.append($row)
        console.log($row)
        for(var col = 0; col < cols; col++){
            var $col = $("<td>")
            $col.click(addLife)
            $row.append($col)
            $col.attr("id", row + "_" + col)
        }
    }
}

function addLife(){

    if(!clock){
        clock = setInterval(updateClock, 1000)
    }

    // console.log(this)
    $(this).toggleClass("livecell")
}

// function rightClick(event){
//     console.log(this)
//     event.preventDefault()
//     $(this).toggleClass("deadcell")
// }

var clock
var current_seconds = 0
function updateClock(){
    $("#clock").html(current_seconds++)
}

function gameTick(){
    if(!clock){
        clock = setInterval(lifeDeath, 1000)
    }
}

function neighboursOf(cell){
    console.log(cell.attr("id").split("_"))
    var x = parseInt(cell.attr("id").split("_")[0])
    var y = parseInt(cell.attr("id").split("_")[1])
    var count = 0
    var neighbors = [$("#" + (x-1) + "_" + (y-1)),
                     $("#" +  x    + "_" + (y-1)),
                     $("#" + (x+1) + "_" + (y-1)),
                     $("#" + (x-1) + "_" +  y),
                     $("#" + (x+1) + "_" +  y),
                     $("#" + (x-1) + "_" + (y+1)),
                     $("#" +  x    + "_" + (y+1)),
                     $("#" + (x+1) + "_" + (y+1))
                 ]
    for(var i = 0; i < neighbors.length; i++) {
        if (neighbors[i].hasClass("livecell")){
            count++
        }
    }
    return
}


function lifeDeath(){
    var current_table = $("lifeboard")
    var next_rows = 10
    var next_cols = 20

    var $next_table = $("<table>")
    for(var next_row = 0; next_row < next_rows; next_row++){
        var $next_row = $("<tr>")
        $next_table.append($next_row)
        // console.log($next_row)
        for(var next_col = 0; next_col < next_cols; next_col++){
            var $next_col = $("<td>")
            // $col.click(clickCell)
            $row.append($next_col)
            $col.attr("id", next_row + "_" + next_col)
            var check = neighboursOf($('#' + next_row + '_' + next_cell))
            if (check == 3){
                $next_cell.addClass("livecell")
            } else if (check == 2 && $('#' + next_row + '_' + next_cell).hasClass("livecell")){
                $next_cell.addClass("livecell")
            }
        }
    }
}

$("#startButton").click(createTable)
$("#tickButton").click(gameTick)
var clock = false
