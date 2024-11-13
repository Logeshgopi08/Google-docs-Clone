const express = require("express");
const ConnectDb = require("./Config/database");
const cors = require("cors");
// const app = express();

const {app,server } = require("./socket/socket");

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));


app.use(express.json());


ConnectDb().then(()=>{
    server.listen(5000,()=>{
        console.log("Server is running in 5000");
        
    })
});




