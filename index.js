const express = require('express');
const app = express();

const datastore = require("nedb");
const database = new datastore('database.db');
database.loadDatabase();

const port = 3000;

const countryData = [];
var fs = require('fs');

app.get('/',(req,res) => res.send("Hello World! I'm a response"));

app.listen(port, () => console.log(`Listening on port: ${port}`));
app.use(express.static('public'));
app.use(express.json());





app.post("/api", (req, res) => {
    data= req.body;
    //Array saving cureent session, not needed
    countryData.push(data);

    //File storing all country codes and names ever, not needed
    fs.appendFile('Countrycodes.csv', `${data.countryCode}, ${data.countryName}\n`, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    // Main API and DB part


    database.findOne({
        "countryCode": data.countryCode
    }, (err, dbdata) => {
        if (dbdata == null) {
            database.insert(data);
            res.send("Nobody has commented yet!");
        } else {
            res.send(dbdata.comment);
        }
    });

});



app.post("/comment", (req, res) => {
    data = req.body;
    database.update({
        "countryCode": data.countryCode
    }, {
        $set: {
            "comment": data.comment
        }
    });
    database.persistence.compactDatafile()
    res.send("ok!");
});