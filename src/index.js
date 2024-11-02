const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/info', require('./router/info.route'))
app.use('/infomatrix', require('./router/infomatrix.route'))
app.use('/infointer', require('./router/infointer.route'))
app.use('/integrateq', require('./router/integrateq.route'))
app.use('/diff', require('./router/diff.route'))

app.get('/', (req , res) => {
    res.send("Hello")
  }
)

app.listen(4000, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:4000`);
})
