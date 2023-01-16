import { Types } from "mongoose";

export class ConsultationDTO {
    public theme!: string;

    public timeslotId!: Types.ObjectId;

    constructor(input: { theme: string; timeslotId: Types.ObjectId }) {
        this.theme = input.theme;
        this.timeslotId = input.timeslotId;
    }
}
