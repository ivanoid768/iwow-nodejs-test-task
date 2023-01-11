module.exports = {
    async up(db, client) {
        const lawBranches = [
            "Административное",
            "Гражданское",
            "Земельное",
            "Конституционное",
            "Налоговое",
            "Семейное",
            "Таможенное",
            "Трудовое",
            "Уголовное",
            "Уголовно-исполнительное",
            "Финансовое",
            "Экологическое",
        ];

        await db.collection("lawbranchclasses").insertMany(
            lawBranches.map((lb) => {
                return { name: lb };
            })
        );
    },

    async down(db, client) {
        await db.collection("lawbranchclasses").remove();
    },
};
