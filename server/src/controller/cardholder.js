var express = require('express');
const print = require('../../utils/console');
const response = require('../../utils/responses');
var router = express.Router();
const stripe = require('stripe')('sk_test_51KEqOnAW19xZnYLVP0qA7qKZMDsrGN0FdmpSlfc9W7p8jEL8ZH1N0WSbFcgzuY7ajGj1Md2JFj5Xo0HPgtDnwhfa00UaN5dajB');

router.post('/', async function (req, res, next) {
    try {
        const cardholder = await stripe.issuing.cardholders.create({
            type: req.body.type,
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            billing: {
                address: {
                    line1: req.body.billing.address.line1,
                    city: req.body.billing.address.city,
                    state: req.body.billing.address.state,
                    country: req.body.billing.address.country,
                    postal_code: req.body.billing.address.postal_code,
                },
            },
        });
        response.successResponse(true, cardholder, res)
    } catch (error) {
        print(error);
        response.serverFailureResponse(error.message, res)
    }
});

router.get('/', async function (req, res, next) {
    try {
        print(req.query)
        const cardholder = await stripe.issuing.cardholders.retrieve(
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
        const cardholders = await stripe.issuing.cardholders.list({
            limit: 3,
        });
        response.successResponse(true, cardholders, res)
    } catch (error) {
        print(error);
        response.serverFailureResponse(error.message, res)
    }
})


module.exports = router;
