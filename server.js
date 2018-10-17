var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var sqlite3 = require('sqlite3').verbose();
var colors = require('colors');

app = express();
db = new sqlite3.Database('sqlite.db');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'ejs');
// app.engine('.html',require('ejs').__express);
app.use(express.static(__dirname + '/public'));


//// DATABASE ////
// Create Table  
db.serialize(function() {  
    db.run("CREATE TABLE IF NOT EXISTS fruits (name TEXT,size TEXT,shape TEXT,color TEXT)");  
});  

// Insert into Table  
db.serialize(function() {  
    db.run("INSERT into fruits(name,size,shape,color) VALUES ('','','','')");  	
}); 

// Delete from Table  
db.serialize(function() {  
    db.run("DELETE FROM fruits WHERE name=''");  	
}); 


//// ROUTES ////
// Get All Fruits from DB
app.get('/', function (req, res, next) {
    db.all('SELECT * FROM fruits ORDER BY name', function(err, row) {
        if(err !== null) {
            next(err);
        }
        else {
            console.log(row);
            res.render('index', {fruits: row});
        }
    });
});

// Save Fruit to DB
app.post('/add_fruit', function(req, res, next) {
    name = req.body.name;
	size = req.body.size;
	shape = req.body.shape;
	color = req.body.color;
    sqlRequest = "INSERT INTO 'fruits' (name,size,shape,color) VALUES('" + name + "','" + size + "','" + shape + "','" + color + "')";
    db.run(sqlRequest, function(err) {
        if(err !== null) {
            next(err);
        }
        else {
            res.redirect('back');
        }
    });
    console.log(colors.red("1 record INSERTED INTO fruits (name='" + name + "',size='" + size + "',shape='" + shape + "',color='" + color + "')"));
});

// Delete Fruit From DB
app.get('/delete/:name', function(req, res, next) {
    console.log(colors.red("DELETE FROM fruits WHERE name='" + req.params.name + "' "));
    db.run("DELETE FROM fruits WHERE name='" + req.params.name + "' ",
        function(err) {
            if(err !== null) {
                next(err);
            }
            else {
                res.redirect('back');
            }
        });
});

    
//// API ENDPOINTS ////
var fields = ["name", "size", "shape", "color"];
 
// ALL JSON from DB
app.get('/api/fruits', function(req, res){
    db.all("SELECT " + fields.join(", ") + " FROM fruits", function(err, rows) {
        res.json(rows);
    });
    console.log(colors.blue("SELECT " + fields.join(", ") + " FROM fruits") + "=> ALL JSON CALL");
});

// Each JSON from DB
app.get('/api/fruits/:name', function(req, res){
    name = req.params.name;
    db.each("SELECT " + fields.join(", ") + " FROM fruits WHERE name='" + name + "' ", function(err, name) {
        res.json(name);
    });
    console.log(colors.red("SELECT " + fields.join(", ") + " FROM fruits WHERE name='" + name + "'") + "=> EACH JSON CALL");
});

console.log("Registering url: http://localhost:80");
console.log("Registering endpoint: /api/fruits");
console.log("Registering endpoint: /api/fruits/:name");
app.listen(port=80,host = '0.0.0.0', function () {
    console.log('app listening on port 80');
});
