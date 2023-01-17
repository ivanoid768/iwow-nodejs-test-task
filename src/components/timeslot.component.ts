import { compareAsc } from "date-fns";
import { ObjectId } from "mongodb";
import { ConsultationTimeslotModel } from "src/models/ConsultationTimeslot";

interface StartFilter {
    $gt?: Date;
    $lt?: Date;
}

export const getTimeslots = async (
    lawyerId: string,
    page: number = 1,
    perPage: number = 20,
    fromDate?: Date,
    toDate?: Date
) => {
    let startFiler: StartFilter = {};
    const filter: {
        lawyer: ObjectId;
        start?: StartFilter;
    } = { lawyer: new ObjectId(lawyerId) };

    if (fromDate) {
        startFiler.$gt =
            compareAsc(fromDate, Date.now()) < 0
                ? new Date(Date.now())
                : fromDate;
    } else {
        startFiler.$gt = new Date(Date.now());
    }

    if (toDate) {
        startFiler.$lt = toDate;
    }

    filter.start = startFiler;

    const timeslots = await ConsultationTimeslotModel.find(
        filter,
        {},
        { skip: (page - 1) * perPage, limit: perPage, sort: { start: 1 } }
    );

    const total = await ConsultationTimeslotModel.count(filter);

    return { timeslots, total };
};
