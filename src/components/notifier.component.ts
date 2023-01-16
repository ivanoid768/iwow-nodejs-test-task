import { addDays, endOfDay, format } from "date-fns";
import { ClientClass } from "src/models/Client";
import { ConsultationClass } from "src/models/Consultation";
import { ConsultationTimeslotModel } from "src/models/ConsultationTimeslot";
import { LawyerModel } from "src/models/Lawyer";
import { appendFile, createWriteStream } from "fs";

export const notifyClientsDayBefore = async () => {
    const now = Date.now();
    const fromDate = endOfDay(now);
    const toDate = endOfDay(addDays(now, 1));

    const timeslots = await ConsultationTimeslotModel.find(
        {
            start: {
                $gt: fromDate,
                $lt: toDate,
            },
            isFree: false,
        },
        {},
        {
            populate: {
                path: "consultation",
                populate: { path: "client" },
            },
        }
    );

    // const notifier = createWriteStream("../../notify.log", {
    //     flags: "a",
    // });

    for (const timeslot of timeslots) {
        const consultation = timeslot.consultation as ConsultationClass;
        const client = consultation.client as ClientClass;

        let date = format(now, "dd.MM.yyyy");
        let clientName = client.getFullName();
        let consulTime = format(timeslot.start, "HH:mm");

        let lawyer = await LawyerModel.findById(consultation.lawyer);

        let notStr = `${date} | Привет ${clientName}. Напоминаем о консультации с юристом ${lawyer.getFullName()} завтра в ${consulTime}.`;
        // {{ date }} | Привет {{ name }}. Через 2 часа у вас консультация с юристом {{ name }}.
        console.log(notStr);

        appendFile("./notify.log", notStr + "\n", function (e) {
            if (e) {
                console.log(e.message);
            } else {
                // done
            }
        });
    }
};
