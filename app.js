const express = require('express');
const fs = require('fs');
const app = express();
const base = fs.readFileSync("./client/base.html", 'utf8');
const nav = fs.readFileSync("./client/nav.html", 'utf8');

app.get('/', function(req, res) {
    res.send(parse("index.html", false));
})

app.use(express.static('public'))

app.listen(process.env.PORT || 3000, function() {
    console.log('Example app listening on port '+process.env.PORT || "3000"+"!");
})

function parse(file, logged) {


    var page = base;

    if (logged) {
        //Then we will parse for the logged in navbar
    }
    else {
        page = page.replace("{{nav}}", nav);
    }

    page = page.replace("{{content}}", fs.readFileSync("./client/views/" + file, 'utf8'));

    return page;
}
