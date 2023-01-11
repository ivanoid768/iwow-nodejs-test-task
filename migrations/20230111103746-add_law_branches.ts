import { Db } from "mongodb";
import { LawBranchModel } from "../src/models/LawBranch";

export async function up(db: Db) {
    const lawBranches = [
        "Административное право;",
        "Гражданское право;",
        "Земельное право;",
        "Конституционное право;",
        "Налоговое право;",
        "Семейное право;",
        "Таможенное право;",
        "Трудовое право;",
        "Уголовное право;",
        "Уголовно-исполнительное право;",
        "Финансовое право;",
        "Экологическое право",
    ];

    await LawBranchModel.insertMany(
        lawBranches.map((lb) => {
            name: lb;
        })
    );
}

export async function down(db: Db) {
    await LawBranchModel.remove();
}
