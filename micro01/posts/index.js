const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const { resolve } = require("path");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.post("/post", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  console.log("Received Event in Post ", req.body.type);
  res.send({});
});

// let promise = new Promise((resolve, reject)=>{
//     let x = 1;
//     setTimeout(()=>{
//         if(x==1){
//             resolve(x);
//         }
//         else{
//             reject(10);
//         }
//     }, 3000)
// })

// promise.then((value)=>{
//     console.log(value);
// })
// .catch((err)=>{
//     console.log(err)
// })
// .finally(()=>{
//     console.log("in finally");
// })

app.listen(4000, () => {
  console.log("listening on port 4000");
});
