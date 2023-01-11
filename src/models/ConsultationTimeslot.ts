import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { ConsultationClass } from "./Consultation";

export class ConsultationTimeslotClass {
    @prop({
        default: true,
    })
    public isFree!: boolean;

    @prop()
    public start!: Date;

    @prop()
    public end!: Date;

    @prop({ ref: () => ConsultationClass })
    public consultation!: Ref<ConsultationClass>;
}

export const ConsultationTimeslotModel = getModelForClass(
    ConsultationTimeslotClass
);
