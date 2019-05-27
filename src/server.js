const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', require('./routes/api'));

app.listen(7788, () => {
    console.log("App started on http://localhost:7788");
})