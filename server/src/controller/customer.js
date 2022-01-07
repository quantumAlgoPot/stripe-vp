var express = require('express');
var router = express.Router();
const print = require('../../utils/console');
const response = require('../../utils/responses');
const stripe = require('stripe')('sk_test_51KEqOnAW19xZnYLVP0qA7qKZMDsrGN0FdmpSlfc9W7p8jEL8ZH1N0WSbFcgzuY7ajGj1Md2JFj5Xo0HPgtDnwhfa00UaN5dajB');

// Create Customer
router.post('/', async function (req, res, next) {
    try {
        const customer = await stripe.customers.create({
            description: 'My First Test Customer (created for API docs)',
        });
        response.successResponse(true, customer, res)
    } catch (error) {
        print(error);
        response.serverFailureResponse(error.message, res)
    }
});

// Get Single Customer
router.get('/', async function (req, res, next) {
    try {
        print(req.query)
        const customer = await stripe.customers.retrieve(
            req.query.key
        );
        response.successResponse(true, customer, res)
    } catch (error) {
        print(error);
        response.serverFailureResponse(error.message, res)
    }
})

// List All Customers
router.get('/all', async function (req, res, next) {
    try {
        const customers = await stripe.customers.list({
            limit: 3,
        })
        response.successResponse(true, customers, res)
    } catch (error) {
        print(error);
        response.serverFailureResponse(error.message, res)
    }
})

// Update Customer
router.put('/', async function (req, res, next) {
    try {
        const customers = await stripe.customers.list({
            limit: 3,
        })
        response.successResponse(true, customers, res)
    } catch (error) {
        print(error);
        response.serverFailureResponse(error.message, res)
    }
})

// Delete Customer
router.delete('/', async function (req, res, next) {
    try {
        const deleted = await stripe.customers.del(
            req.query.key
        );
        response.successResponse(true, deleted, res)
    } catch (error) {
        print(error);
        response.serverFailureResponse(error.message, res)
    }
})
module.exports = router;
