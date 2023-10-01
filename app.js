const express = require('express');
const app = express();
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

app.use(express.json());
app.use(cors());

app.use('/api',apiRoutes);


app.listen(8000,()=>{
  console.log('app listening on port 8000');
})