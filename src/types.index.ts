import {
    addDays,
    addHours,
    addMinutes,
    addWeeks,
    compareAsc,
    compareDesc,
    lastDayOfMonth,
    nextMonday,
    nextSaturday,
} from "date-fns";
import { ConsultationTimeslotModel } from "./models/ConsultationTimeslot";
import { LawyerModel } from "./models/Lawyer";

export const SUB_NOTIFY_NEW_TASKS = "SUB_NOTIFY_NEW_TASKS";

export interface INewTasksPayload {
    userId: number;
    filterId: number;
}

export const generateTimeslots = async (consult_duration: number = 40) => {
    const lawyers = await LawyerModel.find();

    for (const lawyer of lawyers) {
        let startWeek = nextMonday(Date.now());

        for (
            let weekStart = startWeek;
            compareAsc(weekStart, lastDayOfMonth(startWeek)) <= 0;
            weekStart = addWeeks(weekStart, 1)
        ) {
            for (
                let dayStart = weekStart;
                compareAsc(dayStart, nextSaturday(weekStart)) <= 0;
                dayStart = addDays(dayStart, 1)
            ) {
                for (
                    let consultStart = addHours(dayStart, 8);
                    compareAsc(consultStart, addHours(dayStart, 18)) <= 0;
                    consultStart = addMinutes(consultStart, consult_duration)
                ) {
                    await ConsultationTimeslotModel.create({
                        start: consultStart,
                        end: addMinutes(consultStart, consult_duration),
                        lawyer: lawyer,
                    });
                }
            }
        }
    }
};
