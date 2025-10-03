const connectToMongo = require('./dbConnect');
const express = require('express')

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json()); // Middleware to use req,res 
//Available routes
app.get('/' , (req,res)=>{
    res.send("Hello Harry");
});

//Available Routes 
app.use('/api/auth/' , require('./routes/auth'))
app.use('/api/notes' , require('./routes/notes'))


app.listen(port , ()=>{
console.log("App is listening at port" , port);
});