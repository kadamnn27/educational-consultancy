import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app=express();
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
     extended: true
}));

app.listen(5000,()=>console.log('listening on port'));