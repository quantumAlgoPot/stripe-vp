var express = require('express');
var router = express.Router();
const print = require('../../utils/console');
const response = require('../../utils/responses');
const stripe = require('stripe')('sk_test_51KEqOnAW19xZnYLVP0qA7qKZMDsrGN0FdmpSlfc9W7p8jEL8ZH1N0WSbFcgzuY7ajGj1Md2JFj5Xo0HPgtDnwhfa00UaN5dajB');

// Create Payment Method
router.post('/', async function (req, res, next) {
    try {
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                number: '4242424242424242',
                exp_month: 1,
                exp_year: 2023,
                cvc: '314',
            },
        });
        response.successResponse(true, paymentMethod, res)
    } catch (error) {
        print(error);
        response.serverFailureResponse(error.message, res)
    }
});

// Attach  Payment Method
router.post('/attach', async function (req, res, next) {
    try {
        const paymentMethod = await stripe.paymentMethods.attach(
            req.query.paymentMethod,
            { customer: req.query.customerId }
        );
        response.successResponse(true, paymentMethod, res)
    } catch (error) {
        print(error);
        response.serverFailureResponse(error.message, res)
    }
});

// Dettach Payment Method
router.post('/dettach', async function (req, res, next) {
    try {
        const paymentMethod = await stripe.paymentMethods.detach(
            'pm_1KEugKAW19xZnYLVVaaD8Du2'
          );
        response.successResponse(true, paymentMethod, res)
    } catch (error) {
        print(error);
        response.serverFailureResponse(error.message, res)
    }
});

// Get Single Payment Method
router.get('/', async function (req, res, next) {
    try {
        print(req.query)
        const paymentMethod = await stripe.paymentMethods.retrieve(
            req.query.key
        );
        response.successResponse(true, paymentMethod, res)
    } catch (error) {
        print(error);
        response.serverFailureResponse(error.message, res)
    }
})

// List All Payment Methods
router.get('/all', async function (req, res, next) {
    try {
        const paymentMethods = await stripe.paymentMethods.list({
            customer: req.query.customerId,
            type: 'card',
        });
        response.successResponse(true, paymentMethods, res)
    } catch (error) {
        print(error);
        response.serverFailureResponse(error.message, res)
    }
})

module.exports = router;
