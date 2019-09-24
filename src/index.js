const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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


// DB schema
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

Item = mongoose.model('item', ItemSchema);
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) =>{
    res.send("it's working :)")   
})


const port = 3000;
app.listen(port, () => console.log('Server running...'));