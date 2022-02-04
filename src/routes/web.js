const express = require('express');

const fbController = require('../controllers/fbController');

const router = express.Router();

const initWebRoute = (app) => {
    router.get('/', fbController.getHomePage);
    router.post('/webhook', fbController.postWebhook);
    router.get('/webhook', fbController.getWebhook)
    return app.use('/', router);
}

module.exports = initWebRoute