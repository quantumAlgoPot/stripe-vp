var express = require('express');
var app = express();
var cardhold = require('../src/controller/cardholder')
var virtualcard = require('../src/controller/card')
var customer = require('../src/controller/customer')
var payment = require('../src/controller/payment')

app.use('/cardholder', cardhold);
app.use('/virtualcard', virtualcard);
app.use('/customer', customer);
app.use('/payment', payment);


module.exports = app;
