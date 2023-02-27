const express = require("express");
const app = express();
const Joi = require("joi")

const books = [
{id : 1 , name : "english"},
{id : 2 , name : "physics"},
];


app.use(express.json());

app.get("/" , (req,res) =>{
res.send("hello");
});


app.post("/api/books", (req,res) =>{

    const schema = Joi.object({
        name : Joi.string().min(4).required()
    });
    const result = schema.validateAsync(req.body);
    console.log(result)
    console.log(req.body)
    if (result.error){
        res.status(400).send(result.error)
        return;
    }
    const book = {
        id : books.length + 1 ,
        name : req.body.name
    };

    books.push(book);
    res.send(book);

});

app.get("/api/books/:id", (req,res)=>{
const book = books.find( b => b.id === parseInt(req.params.id) );
if(!book) res.status(404).send("Unavailable")
res.send(book);
});

app.put("/api/books/:id", (req,res)=>{
    const book = books.find( b => b.id === parseInt(req.params.id) );
    if(!book) res.status(404).send("Unavailable")
    res.send(book);


    const schema = Joi.object({
        name : Joi.string().min(4).required()
    });

    const result = schema.validate(req.body, schema );
    console.log(result)
    if (result.error){
        res.status(400).send(result.error)
        return;
    }

    

    book.name = req.body.name
    res.send(book)
    




    });









const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`listening on ${port}`)
});