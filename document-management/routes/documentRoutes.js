const express = require('express');
const { Op } = require('sequelize');  // Importing the Op object for complex queries
const router = express.Router();
const Document = require('../models/Document');

/*{
    "name":"Brough",
    "type":"application for admission",
    "body":"Я обращаюсь с просьбой предоставить мне ежегодный оплачиваемый отпуск с [дата начала] по [дата окончания]. За время моего отсутствия все текущие проекты и задачи будут переданы коллегам, с которыми я уже договорился о замещении.Благодарю вас за рассмотрение моей заявки и за поддержку в планировании моего отпуска таким образом, чтобы это минимально повлияло на работу отдела.",
    "user":"Madjahe"
}*/
router.post('/', async (req, res) => {
    try {
        const document = await Document.create(req.body);
        res.status(201).send(document);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// http://127.0.0.1:3000/documents/1
/*{
    "name":"Brough",
    "type":"application_for_vacation",
    "body":"Я обращаюсьЯ обращаюсьЯ обращаюсьЯ обращаюсьЯ обращаюсьЯ обращаюсьЯ обращаюсьЯ обращаюсьЯ обращаюсьЯ обращаюсьЯ обращаюсь",
    "user":"Madjahed"
}*/
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Document.update(req.body, { where: { id } });
        if (updated) {
            const updatedDocument = await Document.findOne({ where: { id } });
            res.status(200).send(updatedDocument);
        } else {
            throw new Error('Document not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// http://127.0.0.1:3000/documents/1
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Document.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send("Document deleted");
        } else {
            throw new Error('Document not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// http://127.0.0.1:3000/documents/user/Madjahed
router.get('/user/:user', async (req, res) => {
    try {
        const documents = await Document.findAll({
            where: { user: req.params.user }
        });
        res.send(documents);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// http://127.0.0.1:3000/documents/status?user=Madjahed&signed=false
router.get('/status', async (req, res) => {
    try {
        const { user, signed } = req.query;
        let where = {
            user: user,
            signingDate: signed === 'true' ? { [Op.ne]: null } : null
        };
        const documents = await Document.findAll({ where });
        res.send(documents);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// http://127.0.0.1:3000/documents/date-range?from=2023-01-01&to=2025-02-01
router.get('/date-range', async (req, res) => {
    try {
        const { from, to } = req.query;
        const documents = await Document.findAll({
            where: {
                creationDate: { [Op.between]: [new Date(from), new Date(to)] }
            }
        });
        res.send(documents);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
