const express = require('express')
const port = 3000
import express from "express";
import { homeRouter } from "./src/home/home.controller.js";
import { authMiddleware } from "./src/home/home.controller.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express()

async function main(){
    app.use(authMiddleware)
    app.use(express.json())
    app.use('/api', homeRouter)
    app.all('*', (req,res) => {
        res.status(404).json({message:'Not found'})
    });

    app.listen(process.env.PORT || 4200, () => {
        console.log(`Server started at ${process.env.PORT} port`)
    })
};
main();

/*
app.get('/', (req, res) => {
    res.send('Hello world')
})
*/

