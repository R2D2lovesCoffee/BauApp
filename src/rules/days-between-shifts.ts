import rulesJson from '../rules/rules.json';
import { PriorityEngineer, Schedule } from "../types";
import ScheduleModel from '../models/schedule';

export default async function (engineers: PriorityEngineer[], date: Date): Promise<PriorityEngineer[]> {
    const { recurrence } = rulesJson.rules.daysBetweenShifts.variables;
    let edgeDate = new Date(date);
    edgeDate.setDate(edgeDate.getDate() - recurrence.value)
    edgeDate = new Date(edgeDate);
    const previousSchedules = await ScheduleModel.find({
        date: {
            $gte: edgeDate
        }
    });
    const forbiddenEngineers: PriorityEngineer[] = previousSchedules.map((schedule: Schedule) => schedule.engineers).flat();

    engineers = engineers.filter((engineer: PriorityEngineer) => {
        return forbiddenEngineers
            .map((forbidden: PriorityEngineer) => forbidden._id.toString())
            .includes(engineer._id.toString()) === false;
    });
    return engineers;
}