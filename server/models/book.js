
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    bookName: {
        type: String,
    },
    bookAuthor: {
        type: String
    },
    bookPrice: {
        type: Number,
    },
    bookCategory: {
        type: String
    }
});

const Book =  mongoose.model("Book", BookSchema);
module.exports = Book; 