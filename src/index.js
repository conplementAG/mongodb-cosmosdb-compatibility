const mongoose = require('mongoose');
const app = require('express')();


mongoUrl = process.env.MongoUrl;
console.log(mongoUrl)

// connect to Mongo daemon
mongoose.connect(
    'mongodb://mongo/test',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.get('/', (req, res) =>{
    res.send("it's working :)")   
})

const port = 3000;
app.listen(port, () => console.log('Server running...'));