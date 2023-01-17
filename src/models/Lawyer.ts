import {
    getDiscriminatorModelForClass,
    getModelForClass,
    index,
    prop,
    Ref,
} from "@typegoose/typegoose";
import { LawBranchClass } from "./LawBranch";
import { UserClass, UserModel } from "./User";

@index(
    { phone: 1 },
    { partialFilterExpression: { __t: { $eq: "LawyerClass" } } }
)
export class LawyerClass extends UserClass {
    @prop({
        ref: () => LawBranchClass,
        default: [],
    })
    public lawBranches!: Ref<LawBranchClass>[];
}

export const LawyerModel = getDiscriminatorModelForClass(
    UserModel,
    LawyerClass
);
