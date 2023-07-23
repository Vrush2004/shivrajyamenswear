const router = require('express').Router();
const controller = require('../controller/controller');

router.get('/login', controller.first);

module.exports = router;