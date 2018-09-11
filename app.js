const express = require('express'),
					app = express(),
		 mongoose = require('mongoose');

mongoose.connect('mongodb://test:test123@ds251622.mlab.com:51622/fairfoods');  // mLab database

var orderSchema = new mongoose.Schema({
	client: String,
	bags: Number
});
var Order = mongoose.model("Order", orderSchema);

// app.set('view engine', 'ejs');
app.use('/img', express.static('img'));

app.get('/', (req, res) => res.render('reservation.ejs'));
app.get('/orders', (req, res) => res.render('orders/new.ejs'));

// CREATE NEW ORDER IN DATABASE
app.post('/order', (req, res) => {
  // Save user input from request body into individual variables
  var client = req.body.client;
  var bags = req.body.bags;
  // Create a new order and save to database
  Order.create({
    client: client,
    bags: bags
  }, function (err, newOrder){
    if(err){
      console.log(err);
    }
  })
  // Redirect back to order form
  res.redirect('/');
});

app.listen(3000, () => console.log('Fair Foods Reservation System listening on port 3000!'))