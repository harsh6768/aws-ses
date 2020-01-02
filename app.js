const express=require('express');
const AWS=require('aws-sdk');

const app=express();
const routes=require('./routes/main-routes');

app.use('/',routes);

const PORT=process.env.PORT||3000;

app.listen(PORT,()=>console.log(`Server is up and running on port ${PORT}`));