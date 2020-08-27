const express = require('express');
const mongoose = require('mongoose');
const app = new express();
app.use(express.json());
mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true});

const BookSchema = mongoose.Schema(
    {
        isbn:Number,
        title:String,
        publisher:String
    }
);

const Book = mongoose.model('Book',BookSchema);

app.get('/', (req,res) => 

{
    res.send("Welcome to our Online Book Store");
}

);

var booksString = "/books";

app.get(booksString, (req,res) =>

{
    Book.find()
    .exec()
    .then(  result =>
        {
            res.json(result);
        }
    )
    .catch( err =>
        {
            res.send("An error occurred");
        }
    );
} 
        
);

app.get(booksString + "/:isbn", (req,res) =>

{
    let reqisbn = parseInt(req.params.isbn);
    Book.findOne({isbn:reqisbn})
    .exec()
    .then(  result =>
        {
            res.json(result);
        }
    )
    .catch( err =>
        {
            res.send("An error occurred");
        }
    );
}

);

app.post(booksString + "/add" , (req,res) =>

{
    let newBook = new Book(
        {
            isbn:req.body.isbn,
            title:req.body.title,
            publisher:req.body.publisher
        }
    );

    newBook
    .save()
    .then( result =>
        {
            res.json(result);
        }
    )
    .catch( err =>
        {
            res.send("An error occurred");
        }
    );
}

);

app.put(booksString + "/changetitle", (req,res) =>

{
    Book.update({isbn:parseInt(req.body.isbn)},{title:req.body.title})
    .exec()
    .then( result =>
        {
            res.json(result);
        }
    )
    .catch( err => 
        {
            res.send("An error occurred");
        }
    );
}

);

app.delete(booksString, (req,res) =>

{
    Book.remove({title:req.body.title})
    .exec()
    .then(  result =>
        {
            res.json(result);
        }
    )
    .catch( err =>
        {
            res.send("An error occurred");
        }
    );
}

);

app.listen(8080);