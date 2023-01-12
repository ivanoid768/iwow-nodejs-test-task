const bcrypt = require("bcrypt");

module.exports = {
    async up(db, client) {
        await db.collection("clientclasses").insert([
            {
                name: "Client_1",
                lastname: "Client_1.lastname",
                patronymic: "Client_1.patronymic",
                phone: 7775553322,
                password: await bcrypt.hash("passwordQ3", 10),
            },
            {
                name: "Client_2",
                lastname: "Client_2.lastname",
                patronymic: "Client_2.patronymic",
                phone: 7775553344,
                password: await bcrypt.hash("passwordQ3", 10),
            },
        ]);
    },

    async down(db, client) {
        await db.collection("clientclasses").remove();
    },
};
