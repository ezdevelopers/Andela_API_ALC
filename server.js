//BASE SETUP

//require everthing we need

var express = require("express"); //call express
//var cors = require('cors')// require Cross Origin Requests
var app = express(); //define our app using express
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Book = require("./app/js/models/books");
var path = require('path');

mongoose.connect("mongodb://ezechukwu:1234@ds121225.mlab.com:21225/eze");

//configure our app to accept Cross Origin Requests
//app.use(cors());
//configure our app to use bodyParser()
//this will let us get data from post

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

//ROUTES FOR OUR API

var router = express.Router(); // get an instance of express router

//middleware
router.use(function (req, res, next) {
    //checking for CORS header
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next(); //make sure we go to the next routes and don't stop there.
});

//test route
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/app/css/materialize.min.css'));
    res.sendFile(path.join(__dirname + '/app/css/styles.css'));
    res.sendFile(path.join(__dirname + '/app/index.html'));

});
router.get('/api', function (req, res) {
    res.json({
        message: "Please use our api path 'api/book'"
    });
});

//more routes 
//This route handles request for post and get requests
router.route('/api/book')
    //post request to add new book
    .post(function (req, res) {
        var book = new Book();
        book.name = req.body.name;
        book.isbn = req.body.isbn;
        book.author = req.body.author;
        book.description = req.body.description;

        //save the book and check for errors
        book.save(function (err) {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    message: "Book was created successfully"
                });
            }
        });
    })
    //get request to get all books
    .get(function (req, res) {
        Book.find(function (err, books) {
            if (err) {
                res.send(err);
            } else {
                res.json(books);
            }
        });
    });

//This route handles request for put and delete requests
router.route('/api/book/:book_id')
    //get a single book by id
    .get(function (req, res) {
        Book.findById(req.params.book_id, function (err, book) {
            if (err) {
                res.send(err)
            } else {
                res.json(book);
            }
        })
    })
    //Update the book with the id
    .put(function (req, res) {
        Book.findById(req.params.book_id, function (err, book) {
            if (err) {
                res.send(err)
            } else {
                book.name = req.body.name;
                book.isbn = req.body.isbn;
                book.author = req.body.author;
                book.description = req.body.description;

                //save the book and check for errors
                book.save(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.json({
                            message: 'Book Updated'
                        });
                    }
                });
            }
        });
    })
    //remove book from database
    .delete(function (req, res) {
        Book.remove({
            _id: req.params.book_id
        }, function (err) {
            if (err) {
                res.send(err)
            } else {
                res.json({
                    message: 'Book deleted'
                })
            }
        });
    });

//REGISTER ROUTES
app.use('/', router);


//START SERVER
app.listen(port);

console.log("magic happens on port " + port);