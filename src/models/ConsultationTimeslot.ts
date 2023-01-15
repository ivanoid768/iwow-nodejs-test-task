import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { ConsultationClass } from "./Consultation";
import { LawyerClass } from "./Lawyer";

export class ConsultationTimeslotClass {
    @prop({
        default: true,
    })
    public isFree!: boolean;

    @prop({
        required: true,
    })
    public start!: Date;

    @prop({
        required: true,
    })
    public end!: Date;

    @prop({ ref: () => ConsultationClass, required: false })
    public consultation?: Ref<ConsultationClass>;

    @prop({ ref: () => LawyerClass, required: true })
    public lawyer!: Ref<LawyerClass>;
}

export const ConsultationTimeslotModel = getModelForClass(
    ConsultationTimeslotClass
);
