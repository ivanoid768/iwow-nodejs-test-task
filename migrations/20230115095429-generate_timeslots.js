const {
    addDays,
    addHours,
    addMinutes,
    addWeeks,
    compareAsc,
    lastDayOfMonth,
    nextSaturday,
    previousMonday,
    startOfDay,
} = require("date-fns");

module.exports = {
    async up(db, client) {
        const consult_duration = 40;

        const lawyers = await db.collection("userclasses").find({__t:'LawyerClass'}).toArray();

        for (const lawyer of lawyers) {
            let startWeek = startOfDay(previousMonday(Date.now()));

            for (
                let weekStart = startWeek;
                compareAsc(weekStart, lastDayOfMonth(startWeek)) <= 0;
                weekStart = addWeeks(weekStart, 1)
            ) {
                for (
                    let dayStart = weekStart;
                    compareAsc(dayStart, nextSaturday(weekStart)) < 0;
                    dayStart = addDays(dayStart, 1)
                ) {
                    const timeslots = [];

                    for (
                        let consultStart = addHours(dayStart, 8);
                        compareAsc(consultStart, addHours(dayStart, 17)) < 0;
                        consultStart = addMinutes(
                            consultStart,
                            consult_duration
                        )
                    ) {
                        timeslots.push({
                            start: consultStart,
                            end: addMinutes(consultStart, consult_duration),
                            lawyer: lawyer._id,
                        });
                    }

                    await db
                        .collection("consultationtimeslotclasses")
                        .insertMany(timeslots);
                }
            }
        }
    },

    async down(db, client) {
        await db.collection("consultationtimeslotclasses").remove();
    },
};
