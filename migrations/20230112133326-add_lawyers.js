const bcrypt = require('bcrypt')

module.exports = {
    async up(db, client) {
        const lawBranches = await db.collection("lawbranchclasses").find().toArray();

        await db.collection("lawyerclasses").insert([
            {
                name: "Lawyer_1",
                lastname: "Lawyer_1.lastname",
                patronymic: "Lawyer_1.patronymic",
                phone: 7775553322,
                password: await bcrypt.hash("passwordQ3", 10),
                lawBranches: [lawBranches[0]._id, lawBranches[1]._id],
            },
            {
                name: "Lawyer_2",
                lastname: "Lawyer_2.lastname",
                patronymic: "Lawyer_2.patronymic",
                phone: 7775553344,
                password: await bcrypt.hash("passwordQ3", 10),
                lawBranches: [lawBranches[0]._id, lawBranches[2]._id],
            },
        ]);
    },

    async down(db, client) {
        await db.collection("lawyerclasses").remove();
    },
};
