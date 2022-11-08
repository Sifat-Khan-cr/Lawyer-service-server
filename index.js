const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion } = require('mongodb');


app.get('/', (req, res) => {
    res.send("Lawyer Server is Running");
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dzhzyda.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {

        const Service = client.db('lawyer').collection('services');
        // Service.insertOne({ name: 'lawer' })
    } catch (error) {
        console.error(error);
    }
}
run();
