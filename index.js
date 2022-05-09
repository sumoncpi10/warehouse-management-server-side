const express = require('express');
var cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
// require("dotenv").config();

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://dbuser1:mZls4c3E1qkkezru@cluster0.d8akk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const userCollection = client.db('warehouse').collection('users');
        const productCollection = client.db('warehouse').collection('products');
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
        // add product 
        app.post('/product', async (req, res) => {
            const newProduct = req.body;
            console.log('adding new Product', newProduct);
            const result = await productCollection.insertOne(newProduct);
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