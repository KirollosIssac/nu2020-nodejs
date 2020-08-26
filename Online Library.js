var express = require('express');
var app = new express();
app.use(express.json());

var Books = 
[
    {isbn:112,title:"C++",publisher:"The books"},
    {isbn:146,title:"Java",publisher:"GEEKS"},
    {isbn:155,title:"OOP",publisher:"CtrlZ"},
];

app.get('/', (req,res) => 

{
    res.send("Welcome to our Online Book Store!");
}

);

var booksString = "/books";

app.get(booksString, (req,res) =>

{
    res.json(Books);
} 
        
);

app.get(booksString + "/:isbn", (req,res) =>

{
    let reqisbn = parseInt(req.params.isbn);
    let book = Books.find(b => b.isbn === reqisbn);
    res.json(book); 
}

);

app.post(booksString + "/add" , (req,res) =>

{
    let newBook = 
    {
        isbn:req.body.isbn,
        title:req.body.title,
        publisher:req.body.publisher
    };

    Books.push(newBook);

    res.json(Books);
}

);

app.put(booksString + "/changetitle", (req,res) =>

{
    let bookIsbn = parseInt(req.body.isbn);
    let book = Books.find(b => b.isbn === bookIsbn);
    let idx = Books.indexOf(book);
    Books[idx].title = req.body.title;
    res.json(Books);
}

);

app.delete(booksString + "/:isbn", (req,res) =>

{
    let book = Books.find( b => b.isbn === parseInt(req.params.isbn));
    Books.splice(Books.indexOf(book),1);
    res.json(Books);
}

);

app.listen(8080);