import { NextFunction, Request, Response } from 'express';
import ScheduleModel from '../models/schedule';
import { getFormatedDate } from '../helper';


export default async (req: Request, res: Response, next: NextFunction) => {
    const today = getFormatedDate();
    const found = await ScheduleModel.findOne({ date: today });
    if (!found) {
        console.log('next?');
        req.today = today;
        next();
    } else {
        res.send(found);
    }
}