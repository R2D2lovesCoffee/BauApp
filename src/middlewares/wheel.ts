import { NextFunction, Request, Response } from 'express';
import ScheduleModel from '../models/schedule';
import { getFormatedDate, isWeekend } from '../helper';


export default async (req: Request, res: Response, next: NextFunction) => {
    // let today = getFormatedDate()
    // today = new Date(today.setDate(today.getDate() - 1));
    const today = getFormatedDate();
    if (isWeekend(today)) {
        return res.send({ message: 'It\'s weekend, have a beer! Cya on monday' })
    }
    const found = await ScheduleModel.findOne({ date: today });
    if (!found) {
        req.today = today;
        next();
    } else {
        res.send(found);
    }
}