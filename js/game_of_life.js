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
    var rows = 20
    var cols = 35

    var $table = $("<table>")
    $("#gameboard").empty()
    $("#gameboard").append($table)
    for(var row = 0; row < rows; row++){
        var $row = $("<tr>")
        $table.append($row)
        console.log($row)
        for(var col = 0; col < cols; col++){
            var $col = $("<td>")
            $col.click(clickCell).contextmenu(rightClick)
            $row.append($col)
            $col.attr("id", row + "_" + col)
        }
    }
}

function clickCell(){

    if(!clock){
        clock = setInterval(updateClock, 1000)
    }

    console.log(this)
    $(this).addClass("bluecell")
}

function rightClick(event){
    console.log(this)
    event.preventDefault()
    $(this).toggleClass("whitecell")
}

var clock
var current_seconds = 0
function updateClock(){
    $("#clock").html(current_seconds++)
}

function findNeighbors(cell){
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
        if (neighbors[i].hasClass("bluecell")){
            count++
        }
    }
    if (count == 0) {
        for(var i = 0; i < neighbors.length; i++) {
            neighbors[i].click()
        }
    }
}
$("#startButton").click(createTable)
