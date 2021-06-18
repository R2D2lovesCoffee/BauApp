import { Request, Response } from 'express';
import { getFormatedDate } from '../helper';
import rulesManager from '../rules/rules-manager';
import ScheduleModel from '../models/schedule';

export default {
    getTodayEngineers: async (req: Request, res: Response) => {
        try {
            const today = getFormatedDate();
            const manager = await rulesManager(today);
            const check = manager.checkRules();
            if (!check) {
                res.status(400).send({ message: 'Rules variables are not met.' });
            }

            for (const rule of manager.rulesInOrder) {
                await manager.applyRule(rule);
            }

            const engineers = manager.getEngineers();
            await ScheduleModel.create({ date: today, engineers });
            res.send(manager.getEngineers());
        } catch (err) {
            res.status(500).send({ message: 'Something went wrong.' });
            console.log(err);
        }

    }
}
