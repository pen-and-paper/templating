const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', function(req, res) {
    res.send(parse("./index.html"));
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})

function parse(file) {
    return fs.readFileSync(file, 'utf8');
}
