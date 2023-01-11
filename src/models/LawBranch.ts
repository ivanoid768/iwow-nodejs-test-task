import { getModelForClass, prop } from "@typegoose/typegoose";

export class LawBranchClass {
    @prop({
        required: true,
        unique: true,
    })
    public name!: string;
}

export const LawBranchModel = getModelForClass(LawBranchClass);
