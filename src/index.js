const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/info',require('./router/info.route'))
app.use('/infomatrix',require('./router/infomatrix.route'))



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})