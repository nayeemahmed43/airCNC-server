const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const dbUser = process.env.DB_USER;
const pass = process.env.DB_PASS;


const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true,
    useUnifiedTopology: true });

    //Get Route

    app.get('/homeInfo',(req,res) =>{
        client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db("airCNC").collection("homeInfo");
            collection.find().toArray((err,documents)=>{
                if(err){
                    console.log(err)
                    res.status(500).send({message:err});
                }
                else{
                    res.send(documents);
                }
            });
            client.close();
          });
    })

    app.get('/experiences',(req,res) =>{
        client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db("airCNC").collection("experiences");
            collection.find().toArray((err,documents)=>{
                if(err){
                    console.log(err)
                    res.status(500).send({message:err});
                }
                else{
                    res.send(documents);
                }
            });
            client.close();
          });
    })

    app.get('/reservationInfo',(req,res) =>{
        client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db("airCNC").collection("reservationInfo");
            collection.find().toArray((err,documents)=>{
                if(err){
                    console.log(err)
                    res.status(500).send({message:err});
                }
                else{
                    res.send(documents);
                }
            });
            client.close();
          });
    })

    //Post Route

    app.post('/homeInfo',(req,res) => {
        const info = req.body;
        client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db("airCNC").collection("homeInfo");
            collection.insert(info,(err,result)=>{
                if(err){
                    console.log(err)
                    res.status(500).send({message:err});
                }
                else{
                    res.send(result.ops[0]);
                }
            });
            client.close();
          });
    })

    app.post('/experiences',(req,res) => {
        const info = req.body;
        client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db("airCNC").collection("experiences");
            collection.insert(info,(err,result)=>{
                if(err){
                    console.log(err)
                    res.status(500).send({message:err});
                }
                else{
                    res.send(result.ops[0]);
                }
            });
            client.close();
          });
    })

    app.post('/guestInfo',(req,res) => {
        const info = req.body;
        client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db("airCNC").collection("guestInfo");
            collection.insert(info,(err,result)=>{
                if(err){
                    console.log(err)
                    res.status(500).send({message:err});
                }
                else{
                    res.send(result.ops[0]);
                }
            });
            client.close();
          });
    })

    app.post('/reservationInfo',(req,res) => {
        const info = req.body;
        client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db("airCNC").collection("reservationInfo");
            collection.insert(info,(err,result)=>{
                if(err){
                    console.log(err)
                    res.status(500).send({message:err});
                }
                else{
                    res.send(result.ops[0]);
                }
            });
            client.close();
          });
    })
const port = process.env.PORT || 4200;
app.listen(port, (err) => {console.log('Listening to port', port)});