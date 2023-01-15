import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { ClientClass } from "./Client";
import { ConsultationTimeslotClass } from "./ConsultationTimeslot";
import { LawyerClass } from "./Lawyer";

export class ConsultationClass {
    @prop()
    public theme!: string;

    @prop({ ref: () => LawyerClass })
    public lawyer!: Ref<LawyerClass>;

    @prop({ ref: () => ClientClass })
    public client!: Ref<ClientClass>;

    // @prop({ ref: () => ConsultationTimeslotClass })
    // public timeslot?: Ref<ConsultationTimeslotClass>;
}

export const ConsultationModel = getModelForClass(ConsultationClass);
