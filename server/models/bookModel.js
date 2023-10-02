const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({

    title:{
        type:String,
        required:[true, "Please Add Title"]
    } ,
    author:{
        type:String,
        required:[true, "Please Add Author"]
    } ,
    description:{
        type:String,
        required:[true, "Please Add Description"]
    } ,
    publicationYear: {
        type:Number,
        required:[true , "Add Publication Year"]
    } ,
    ISBN : {
        type : String ,
        requied : [true , "Add ISBN "]
    }
},
    {
        timestamps : true,
    }
)
module.exports = mongoose.model("book",bookSchema);