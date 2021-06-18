import { NextFunction, Request, Response } from 'express';
import ScheduleModel from '../models/schedule';
import { getFormatedDate } from '../helper';


export default async (req: Request, res: Response, next: NextFunction) => {
    const found = await ScheduleModel.findOne({ date: getFormatedDate() });
    if (!found) {
        return next();
    }
    res.send(found);
}