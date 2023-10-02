const asyncHandler = require("express-async-handler");
const book = require("../models/bookModel");
//@desc Get all books
//@route GET /api/books
//@access public
const getBooks = asyncHandler(async(req,res) => {
    const Book = await book.find();
    res.status(200).json(Book);
});

//@desc Get book based in ISBN
//@route GET /api/book/:ISBN
//@access public
const getBook = asyncHandler(async(req,res) => {
    const Book = await book.findById(req.params.id);
    if(!Book){
        res.status(404);
        throw new Error("Book Not Found");
    }
    res.status(200).json(Book);
});

//@desc Create book 
//@route POST /api/book
//@access public
const createBook = asyncHandler(async(req,res) => {
    console.log("Request body : ",req.body);
    const {title,author,description,publicationYear,ISBN}=req.body;
    if(!title || !author || !description || !publicationYear || !ISBN){
        res.status(400);
        throw new Error("ALl feilds are mandatory");
    }
    const Book = await book.create({
        title,
        author,
        description,
        publicationYear,
        ISBN
    })
    res.status(201).json(Book);
});

//@desc Update book based in ISBN
//@route PUT /api/book/:ISBN
//@access public
const updateBook = asyncHandler(async(req,res) => {
    const updatedBook = await book.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedBook);
});


//@desc Delete book based in ISBN
//@route DELETE /api/book/:id
//@access public
const deleteBook = asyncHandler(async(req,res) => {
    const Book = await book.findById(req.params.id);
    if(!Book){
        res.status(404);
        throw new Error("Book Not Found");
    }
    await Book.deleteOne({ _id: req.params.id });
    res.status(200).json(Book);
});

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}