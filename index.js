const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()
app.use(cors());
app.use(express.json());
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


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
        const Review = client.db('lawyer').collection('reviews');


        app.get('/services', async (req, res) => {

            lim = parseInt(req.query.lim);
            // console.log(lim);
            const query = {}
            const cursor = Service.find(query);
            const services = await cursor.limit(lim).toArray();
            res.send(services);
        });
        app.get('/reviews', async (req, res) => {

            email = req.query.email;
            const query = {}
            const cursor = Review.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });

        app.get('/services/:id', async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await Service.findOne(query);
            res.send(service);
        });

        app.post('/review', async (req, res) => {
            const review = req.body;
            const result = await Review.insertOne(review);
            res.send(result);
        });


    } catch (error) {
        console.error(error.name, error.message);
    }
}
run();
