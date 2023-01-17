import { LawyerModel } from "src/models/Lawyer";

export const getLawyers = async () => {
    return LawyerModel.find({}, { password: 0, __t: 0 }).populate("lawBranches");
};
