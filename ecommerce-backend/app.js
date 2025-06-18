const express= require('express');
const app=  express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');

app.use(cors());

//midlleware
app.use(bodyParser.json());

// Routes
const categoryRoutes=require("./routes/categories");
const productRoutes=require("./routes/products");


app.use('/api/category',categoryRoutes);
app.use('/api/product',productRoutes);


// Database
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database connection is ready....");
    app.listen(process.env.PORT, () => {
    console.log(`Server is running https://localhost:${process.env.PORT}`);
})
}).catch((err)=>{
    console.log(err);
})
// server

