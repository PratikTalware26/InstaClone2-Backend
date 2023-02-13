const express= require('express');
const mongoose = require('mongoose');
const postRoute= require('./Routes/postRoute')
const cors= require('cors')

const mongoUrl= "mongodb+srv://pratiktalware:12345@cluster0.9vfi0pq.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl)
  .then(() => console.log('Connected!')).catch((err)=> console.log(err))

const app= express();
const port= 8080 || process.env.PORT

app.use(cors())
app.use('/api', postRoute)
app.listen(port, ()=> console.log(`app is listening on port ${port}`))