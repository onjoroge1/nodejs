const express = require('express')
const bodyParser = require('body-parser');
const { static } = require('express');
const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const fs = require('fs');
const { strict } = require('assert');
const port = 6500;

filename = ''

app.get('/',(req,res) => {
    res.render('index')
})

app.get('/file',(req,res) => {
    path = './data/'+ filename
    console.log(path)
    try {
        if (fs.existsSync(path)) {
            fs.readFile('./data/db.json',(err,result) => {
                if(err){
                    throw err;
                    res.send("unable to render file")
                }else {
                    res.send(JSON.parse(result))
                }
            })
        }else{
            res.redirect('/')
        }
      } catch(err) {
        console.error(err)
        
      }
})

app.post('/',(req,res) => {
    console.log(req.body.filename)
    filename = req.body.filename
    res.redirect('/file')

})

app.listen(port,(err) => {
    console.log('server is running on port '+port);
})