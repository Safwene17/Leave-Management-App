const express=require('express');
const mongoose=require('./config/connect');

const employeeroute=require('./routes/employee');

const cors = require('cors');//bind express and angular

const app=express();

app.use(express.json());
app.use(cors());


app.use('/employees',employeeroute);


app.listen(5500,()=>{
    console.log('server works');
})





