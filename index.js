const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = "mongodb+srv://root:root@braceletcluster-7uu7g.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// routes
app.use(require('./routes'));

app.listen(PORT, () => console.log('server on!'));
