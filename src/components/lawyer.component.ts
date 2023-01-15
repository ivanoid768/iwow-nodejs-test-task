import { LawyerModel } from "src/models/Lawyer";

export const getLawyers = async () => {
    return LawyerModel.find();
};
