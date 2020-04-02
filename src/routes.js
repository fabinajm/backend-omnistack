const express = require('express');
const { celebrate } = require('celebrate');

const OngsController = require('./controllers/OngsController');
const OngsValidator = require('./validators/OngsValidator');

const IncidentsController = require('./controllers/IncidentController');
const IncidentsValidator = require('./validators/IncidentValidator');

const ProfileController = require('./controllers/ProfileController');
const ProfileValidator = require('./validators/ProfileValidator');

const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get("/ongs", OngsController.list );
routes.post("/ongs", celebrate(OngsValidator.create()), OngsController.create);

routes.post("/incidents", celebrate(IncidentsValidator.create()), IncidentsController.create);
routes.get("/incidents", celebrate(IncidentsValidator.index()) , IncidentsController.index);
routes.delete("/incidents/:id", celebrate(IncidentsValidator.delete()), IncidentsController.delete);

routes.get("/profile", celebrate(ProfileValidator.index()), ProfileController.index);
routes.post("/session", SessionController.create);

module.exports = routes;