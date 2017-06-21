const express = require('express');
const fs = require('fs');
const app = express();
const base = fs.readFileSync("./client/base.html", 'utf8');
const nav = fs.readFileSync("./client/nav.html", 'utf8');
const routes = JSON.parse(fs.readFileSync("./routes.json", 'utf8'));

for (var i in routes){
    console.log(`${i} was loaded as a path!`);
}

app.use(express.static('public'));

app.get('*', function(req, res) {
    
    if (!(req.path in routes)){
        res.send(parse(routes["404"], false));
    } else {
        res.send(parse(routes[req.path], false));
    }
})

app.listen(process.env.PORT || 3000, function() {
    console.log('Example app listening on port '+process.env.PORT || "3000"+"!");
})

function parse(route, logged) {


    var page = base;
    
    page = page.replace("{{title}}", route.title);
    
    if (logged) {
        //Then we will parse for the logged in navbar
    }
    else {
        page = page.replace("{{nav}}", nav);
    }

    page = page.replace("{{content}}", fs.readFileSync("./client/views/" + route.file, 'utf8'));

    return page;
}
