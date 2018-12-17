const TopicService = require('services/TopicService');

const Topic = require('models/Topic');
const {modelValidator} = require('helpers/ValidationHelper');

module.exports = (app) => {

    app.post('/topic', modelValidator(Topic), (req, res) => {
        TopicService.create(req.body, req.requestor)
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send('failed to create topic'));
    });

    app.put('/topic/:id', (req, res) => {
        TopicService.update(req.params.id, req.body, req.requestor)
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send(`failed to change update text of the topic with ID: ${req.params.id}`));
    });

    app.get('/topic', (req, res) => {
        TopicService.getAll()
            .then((response) => res.status(200).send(response))
            .catch(err => res.status(400).send(`No topics in the database.`));
    });

    app.get('/topic/:id', (req, res) => {
            TopicService.getById(req.params.id)
                .then((response) => res.status(200).send(response))
                .catch(err => res.status(400).send(`No topics with id: ${req.params.id} in the database.`));
        }
    );

    app.get('/topic/name/:name', (req, res) => {
            TopicService.getByName(req.params.name)
                .then((response) => res.status(200).send(response))
                .catch(err => res.status(400).send(`No topics with name: ${req.params.name} in the database.`));
        }
    );

    app.delete('/topic/:id', (req, res) => {
            TopicService.remove(req.params.id)
                .then((response) => res.status(200).send(response))
                .catch(err => res.status(400).send(`failed to delete topic with ID: ${req.params.id}`));
        }
    );
};