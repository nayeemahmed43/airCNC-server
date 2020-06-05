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

    app.post('/guestInfo',(req,res) => {
        const product = req.body;
        client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            const collection = client.db("airCNC").collection("guestInfo");
            collection.insert(product,(err,result)=>{
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

app.listen(4200, () => console.log('Listening to port 4200'));