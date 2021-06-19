import { Router, json } from 'express';
import EngineerModel from './models/engineer';
import wheelController from './controllers/wheel';
import wheelMiddleware from './middlewares/wheel';

const router = Router();

router.use(json());

router.post('/engineers', async (req, res) => {
    if (req.body.name) {
        try {
            await EngineerModel.create({ name: req.body.name });
            res.status(201).send();
        } catch (err) {
            res.status(500).send({ message: 'Something went wrong' });
            console.log(err);
        }
    } else {
        res.status(400).send({ message: 'Bad format' })
    }
})

router.get('/engineers', async (_, res) => {
    try {
        const engineers = await EngineerModel.find();
        res.send(engineers)
    } catch (err) {
        res.status(500).send({ message: 'Something went wrong' })
    }
})

router.get('/wheel', wheelMiddleware, wheelController.getTodayEngineers)

router.get('/', (_req, res) => res.redirect('/api/engineers'))

export default router;