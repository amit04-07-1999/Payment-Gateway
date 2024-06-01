const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Razorpay = require('razorpay')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
dotenv.config()
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())


// MongoDB setup
const url = process.env.MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
connection.once('open', () => {
  console.log('MongoDB database connected');
});

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_n5oTuMseyDclhS',
  key_secret: 'eR0Agm0HEGChnUp5Oi1mqUWc'
});

//Create an order 
app.post('/create-order', async (req, res) => {
  const { amount, currency, receipt } = req.body

  const option = {
    amount: amount * 100,
    currency,
    receipt
  }

  try {
    const order = await razorpay.orders.create(option);
    // console.log(order);
    res.json(order)
  } catch (err) {
    // console.error(err);
    res.status(500).send(err)

  }
})


const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})