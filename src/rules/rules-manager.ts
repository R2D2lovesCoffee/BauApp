import rulesJson from './rules.json';
import EngineerModel from '../models/engineer';
import allowMultipleShifts from './allow-multiple-shifts';
import daysBetweenShifts from './days-between-shifts';
import weeksCycle from './weeks-cycle';
import { PriorityEngineer, Engineer } from '../types';

export default (async (date: Date) => {
    let engineers: PriorityEngineer[] = await EngineerModel.find();
    engineers = engineers.map((elem: any) => { return { _id: elem._id, name: elem.name, priority: 0 } })

    return {
        checkRules: async () => {
            const { rules } = rulesJson;
            const noEngineers = engineers.length
            const { noWeeks, noAssignments } = rules.weeksCycle.variables;
            const { assignmentsPerDay } = rulesJson;
            return 5 * noWeeks.value * assignmentsPerDay.value === noEngineers * noAssignments.value;
        },
        applyRule: async (rule: Function) => {
            engineers = await rule(engineers, date);
        },
        rulesInOrder: [daysBetweenShifts, weeksCycle, allowMultipleShifts],
        getEngineers: (): Engineer[] => {
            return engineers.map((elem: any) => {
                delete elem.priority;
                return elem;
            })
        }
    }
})