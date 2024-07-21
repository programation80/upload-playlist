const express = require('express')
const config = require('../config')
const cors = require('cors')
const { processData } = require('../controllers/controllersUpload');
            

const routes = express.Router()

routes.use(express.json())
routes.use(cors({ origin: '*' }))


       
routes.get(config.server.urlBase,processData);

module.exports = routes