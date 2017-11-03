var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    name:String,
    isbn:Number,
    author:String,
    description: String
});

module.exports = mongoose.model("Book", bookSchema);