const express = require('express');
const app = express();

const port = 3000;
const countryData =[];


//app.get('/',(req,res) => res.send("Hello World! I'm a response"));

app.listen(port, () => console.log(`Listening on port: ${port}`));
app.use(express.static('public'));
app.use(express.json());

app.post("/api", (req, res)=>{
//console.log(req.body);
countryData.push(req.body);
//console.log(countryData);
res.send("ok!");
});