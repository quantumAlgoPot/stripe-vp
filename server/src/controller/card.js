var express = require('express');
var router = express.Router();
const print = require('../../utils/console');
const response = require('../../utils/responses');
const stripe = require('stripe')('sk_test_51KEqOnAW19xZnYLVP0qA7qKZMDsrGN0FdmpSlfc9W7p8jEL8ZH1N0WSbFcgzuY7ajGj1Md2JFj5Xo0HPgtDnwhfa00UaN5dajB');

router.post('/', async function (req, res, next) {
  try {
    const card = await stripe.issuing.cards.create({
      cardholder: 'ich_1KEtjQAW19xZnYLVquPBx68N',
      currency: 'usd',
      type: 'virtual',
    });
    response.successResponse(true, card, res)
  } catch (error) {
    print(error);
    response.serverFailureResponse(error.message, res)
  }
});

router.get('/', async function (req, res, next) {
  try {
    print(req.query)
    const cardholder = await stripe.issuing.cards.retrieve(
      req.query.key
    );
    response.successResponse(true, cardholder, res)
  } catch (error) {
    print(error);
    response.serverFailureResponse(error.message, res)
  }
})

router.get('/all', async function (req, res, next) {
  try {
    print("Hello")
    const cards = await stripe.issuing.cards.list({
      limit: 3,
    });
    response.successResponse(true, cards, res)
  } catch (error) {
    print(error);
    response.serverFailureResponse(error.message, res)
  }
})
module.exports = router;
