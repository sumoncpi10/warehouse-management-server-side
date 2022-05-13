const express = require('express');
var cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d8akk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const userCollection = client.db('warehouse').collection('users');
        const productCollection = client.db('warehouse').collection('products');
        const OrderCollection = client.db('warehouse').collection('orders');
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users)
        })
        // add user 
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('adding new user', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        })
        // get product 
        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products)
        })
        // get product Six
        app.get('/productshome', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query).limit(6);
            const products = await cursor.toArray();
            res.send(products)
        })
        // get Orders 
        app.get('/orders', async (req, res) => {
            const query = {};
            const cursor = OrderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders)
        })
        // get Orders by email
        app.get('/order', async (req, res) => {
            const email = req.query.email;
            const query = { email };
            const cursor = OrderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders)
        })
        // get product 
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const product = await productCollection.findOne(query);
            res.send(product);
        })
        // add product 
        app.post('/product', async (req, res) => {
            const newProduct = req.body;
            console.log('adding new Product', newProduct);
            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        })
        // Update product 

        app.put('/product/:id', async (req, res) => {
            const newProduct = req.body;
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updatedDoc = {
                $set:
                    newProduct

            }
            const product = await productCollection.updateOne(filter, updatedDoc, options);
            res.send(product);
        })
        // Delete Product 
        app.delete('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.deleteOne(query);
            res.send(result);
        })
        // add Order 
        app.post('/addorder', async (req, res) => {
            const newOrder = req.body;
            console.log('adding new order', newOrder);
            const result = await OrderCollection.insertOne(newOrder);
            res.send(result);
        })
        // Delete Order 
        app.delete('/order/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await OrderCollection.deleteOne(query);
            res.send(result);
        })

        // console.log(`Document insert with ${result.insertedId}`)
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

// const users = [
//     { id: 1, name: 'sumon' },
//     { id: 2, name: 'simon' },
//     { id: 3, name: 'somon' },
//     { id: 4, name: 'suemon' }
// ]
// app.get('/users', (req, res) => {
//     res.send(users)
// })
// app.get('/user/:id', (req, res) => {
//     console.log(req.params);
//     const id = req.params.id;
//     const user = users.find(u => u.id == id);
//     res.send(user);
// })

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})