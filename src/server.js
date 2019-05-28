const express = require('express');
const {db} = require('./models');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', require('./routes/api'));

db.sync()
.then(() => {
    app.listen(7788, () => {
        console.log("App started on http://localhost:7788");
    });
})
.catch((err) => console.error(err));
