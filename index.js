const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
var cors = require('cors');

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());






const uri = "mongodb+srv://dbuser1:mZls4c3E1qkkezru@cluster0.d8akk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {

    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

const users = [
    { id: 1, name: 'sumon' },
    { id: 2, name: 'simon' },
    { id: 3, name: 'somon' },
    { id: 4, name: 'suemon' }
]
app.get('/users', (req, res) => {
    res.send(users)
})
app.get('/user/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    const user = users.find(u => u.id == id);
    res.send(user);
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})