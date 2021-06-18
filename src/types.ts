import { ObjectId } from "mongoose";

export type PriorityEngineer = {
    _id: ObjectId,
    name: string,
    priority: number,
}

export type Engineer = {
    _id: ObjectId,
    name: string,
}

export type Schedule = {
    _id: ObjectId,
    engineers: Engineer[],
    date: Date,
}