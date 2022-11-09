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
        // Service.insertOne({
        //     name: "Health Care",
        //     info: "The law became intimately involved in medical practice in the 20th century. Historically, legal medicine, or forensic medicine, was a field devoted exclusively to the uses of medicine in the courtroom, primarily in two settings: forensic pathology and forensic psychiatry. The pathologist has traditionally been asked to determine and testify to the cause of death in cases of suspected homicide and to aspects of various injuries involving crimes such as assault and rape. Medical testimony may also be required in civil cases involving, for example, occupational injury, negligent injury, automobile accidents, and paternity suits. Similarly, when a defendant pleads insanity as a defense, a psychiatrist is asked to examine the defendant and to testify as to his or her mental state at the time of the crime. The relevant question is usually whether the defendant’s criminal behaviour was the product of a mental illness or whether he or she was able to distinguish right from wrong. In civil cases, psychiatrists frequently appear as witnesses in cases of child custody and involuntary commitment for mental illness.",
        //     price: "456",
        //     image: "https://i.ibb.co/zbFkb7Q/1240x550-gavel-stethoscope.jpg"
        // })


        app.get('/services', async (req, res) => {

            lim = parseInt(req.query.lim);
            // console.log(lim);
            const query = {}
            const cursor = Service.find(query);
            const services = await cursor.limit(lim).toArray();
            res.send(services);
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
