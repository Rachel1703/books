const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const app = express();
const cors = require('cors');


const bodyParser = require("body-parser");
connectDb();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use("/api/books",require("./routes/bookRoutes"));
app.use(errorHandler);

app.listen(port,() => {
    console.log(`Server listening on port ${port}`);
})

module.exports=app;