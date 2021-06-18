import { PriorityEngineer } from "../types";
import rulesJson from './rules.json';

export default async function (engineers: PriorityEngineer[]): Promise<PriorityEngineer[]> {
    const { assignmentsPerDay } = rulesJson;
    const groupedByPriority: any = {};
    engineers.forEach((engineer: PriorityEngineer) => {
        if (!groupedByPriority[engineer.priority]) {
            groupedByPriority[engineer.priority] = [];
        }
        groupedByPriority[engineer.priority].push(engineer);
    })
    console.log('groupedByPriority before shuffle:', groupedByPriority)
    const priorities = Object.keys(groupedByPriority);
    priorities.forEach((priority: string) => {
        groupedByPriority[priority] = groupedByPriority[priority].sort(() => Math.random() - 0.5);
    })
    console.log('groupedByPriority after shuffle:', groupedByPriority)
    const prioritiesInDescendingOrder = priorities.sort((a: any, b: any) => b - a);
    console.log('priorities in order:', prioritiesInDescendingOrder)
    engineers = [];
    prioritiesInDescendingOrder.forEach((priority: string) => {
        engineers.push(...groupedByPriority[priority])
    })


    return engineers.slice(0, assignmentsPerDay.value);
}