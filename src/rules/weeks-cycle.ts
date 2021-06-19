import { PriorityEngineer } from "../types";
import rulesJson from '../rules/rules.json';
import EngineerModel from '../models/engineer';

export default async function (engineers: PriorityEngineer[], date: Date): Promise<PriorityEngineer[]> {
    const { noAssignments, noWeeks } = rulesJson.rules.weeksCycle.variables;
    let edgeDate = new Date(date);
    edgeDate = new Date(edgeDate.setDate(edgeDate.getDate() - noWeeks.value * 7));

    let weeksCycleAssignments = await EngineerModel.aggregate([
        {
            $lookup: {
                from: "schedules",
                let: { id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            "$and": [
                                {
                                    $expr: {
                                        $in: ["$$id", '$engineers._id']
                                    }
                                },
                                {
                                    date: {
                                        $gte: edgeDate
                                    }
                                }
                            ]

                        }
                    }
                ],
                as: 'assignments'
            },
        },
        {
            $project: {
                noAssignments: { $size: "$assignments" }
            }
        }
    ])


    engineers = engineers.filter((engineer: PriorityEngineer) => {
        const match = weeksCycleAssignments.find((elem: any) => elem._id.toString() === engineer._id.toString())
        engineer.priority = 1000 - match.noAssignments;
        return match.noAssignments < noAssignments.value;
    });
    return engineers;
}