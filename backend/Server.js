//create express modules
const exp = require("express");
const app = exp()
const path = require("path")
require('dotenv').config()

// deploy react build in this server
app.use(exp.static(path.join(__dirname, "../frontend/build")))

//import mongoclient
const mongoClient = require("mongodb").MongoClient;




//body parser middleware
app.use(exp.json());




//connect to database
mongoClient.connect(process.env.DB_URL)
  .then(client => {
    //get db obj
    const nutrinest = client.db('nutrinest');
    //get collection obj
    const userscollection = nutrinest.collection("userscollection")
    const foodcollection=nutrinest.collection("foodcollection");
      //share collection obj with exp app
      app.set("userscollection",userscollection);
      app.set("foodcollection",foodcollection);
      //confirm connection status
      console.log("DB is connected");
  })
  .catch(err => {
    console.log("Error in connection", err);
  })


//import api routes
const userApp = require("./APIS/usersapi")
const foodApp = require("./APIS/foodapi")

//if patr starts with user-api,send request to userApi
app.use('/user-api',userApp)
app.use('/food-api',foodApp)

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
})



//exp err handler
app.use((err, req, res, next) => {
  res.send({message:err.message});
})
const port=process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`))