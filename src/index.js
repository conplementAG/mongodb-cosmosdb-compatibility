const app = require('express')();

app.get('/', (req, res) =>{
    res.send("it's working :)")   
})

const port = 3000;
app.listen(port, () => console.log('Server running...'));