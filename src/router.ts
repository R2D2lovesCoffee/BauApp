import { Router, json } from 'express';
import EngineerModel from './models/engineer';
import wheelController from './controllers/wheel';
import wheelMiddleware from './middlewares/wheel';

const router = Router();

router.use(json());

router.post('/engineers', async (req, res) => {
    await EngineerModel.create({ name: req.body.name });
    res.status(201).send();
})

router.get('/engineers', async (req, res) => {
    const engineers = await EngineerModel.find();
    res.send(engineers)
})

router.get('/wheel', wheelMiddleware, wheelController.getTodayEngineers)

export default router;