const express = require("express")

const app = express();
app.use(express.static("../"));




app.get("/game", function (req, res) {
    res.redirect("./gol/index.html")
});











app.get("/name/:name", function (req, res) {
    let name = req.params.name;
    res.send("<h1>Hello " + name + "<h/1")
})
app.listen(3000, function () {
    console.log("Example is running on port 3000")
});


// app.get("/search/:search", function(req, res){
//     let search = req.params.search;
//     res.redirect("https://www.google.com/search?q= " + search )
// })