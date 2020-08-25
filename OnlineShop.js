const express = require ('express');
const { json } = require('body-parser');

const app = express();
app.use(express.json());

var products = 
[
    {id:1,name:"Milk",price:17},
    {id:2,name:"Tea",price:5},
    {id:3,name:"Rice",price:10}
];

app.get('/', (req,res) => {
    res.send('Online Shop');
}
);

app.get('/products/:id',(req,res) => {
    let reqID = parseInt(req.params.id);
    const product = products.find(p => p.id === reqID);
    res.send(product);
}
);

app.delete('/products/:id',(req,res) => {
    let reqID = parseInt(req.params.id);
    const product = products.find(p => p.id === reqID);
    const idx = products.indexOf(product);
    products.splice(idx,1);
    res.send(products);
}

);

app.post('/products',(req,res) => {
    const product = 
    {
        id:req.body.id,
        name:req.body.name,
        price:req.body.price
    }
    products.push(product);
    res.send(products);
}

);

app.put('/products/:id',(req,res) => {
    let reqID = parseInt(req.params.id);
    const product = products.find(p => p.id === reqID);
    const idx = products.indexOf(product);
    products[idx].name = req.body.name;
    res.send(products);
}

);

app.listen(8080);