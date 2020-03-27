const express = require('express');

const OngsController = require('./controllers/OngsController');
const IncidentsController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get("/ongs", OngsController.list );
routes.post("/ongs", OngsController.create);

routes.post("/incidents", IncidentsController.create);
routes.get("/incidents", IncidentsController.index);
routes.delete("/incidents/:id", IncidentsController.delete);
routes.get("/profile", ProfileController.index);
routes.post("/session", SessionController.create);

module.exports = routes;