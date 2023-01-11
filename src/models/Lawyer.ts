import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { LawBranchClass } from "./LawBranch";
import { UserClass } from "./User";

export class LawyerClass extends UserClass {
    @prop({
        ref: () => LawBranchClass,
        default: [],
    })
    public lawBranches!: Ref<LawBranchClass>[];
}

export const LawyerModel = getModelForClass(LawyerClass);
