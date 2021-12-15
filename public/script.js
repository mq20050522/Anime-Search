const socket = io();

var dictionary = JSON.parse(page);
// console.log(dictionary["To"])

//db.run("CREATE TABLE dataBase ()");

$("#btn").click(function(){
    alert("I'm clicked bitch");
    console.log('message', $('#searchBar').val());
    // if($('Name'.val()) == ""){
    //  socket.emit('message', "nobody" + ": " + $('#Text').val());
    // }
    // else{
    //  socket.emit('message', $('#Name').val() + ": " + $('#Text').val());
    // }
    //socket.emit('message', $('#searchBar').val());
})
