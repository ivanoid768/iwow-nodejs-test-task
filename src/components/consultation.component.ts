import { ConsultationDTO } from "src/dto/consultation.dto";
import { ClientModel } from "src/models/Client";
import { ConsultationModel } from "src/models/Consultation";
import { ConsultationTimeslotModel } from "src/models/ConsultationTimeslot";
import { LawyerModel } from "src/models/Lawyer";
import { UserClass } from "src/models/User";

export const createConsultation = async (
    user: UserClass,
    consultationDTO: ConsultationDTO
) => {
    const timeslot = await ConsultationTimeslotModel.findById(
        consultationDTO.timeslotId
    );
    if (!timeslot) {
        throw new Error("invalid_timeslot_id");
    }
    if (!timeslot.isFree) {
        throw new Error("timeslot_is_not_free");
    }

    const lawyerId = timeslot.lawyer;
    const client = await ClientModel.findOne(
        { phone: user.phone },
        { password: 0, __t: 0 }
    );
    if (!client) {
        throw new Error(`no_client_with_phone:${user.phone}`);
    }

    let consultation = await ConsultationModel.create({
        theme: consultationDTO.theme,
        lawyer: lawyerId,
        client: client._id,
    });

    const lawyer = await LawyerModel.findById(lawyerId, {
        password: 0,
        lawBranches: 0,
        __t: 0,
    });

    timeslot.isFree = false;
    timeslot.consultation = consultation;
    await timeslot.save();

    const clientObj = client.toObject();
    delete clientObj["__t"];
    const lawyerObj = lawyer.toObject();
    delete lawyerObj["__t"];

    return {
        theme: consultation.theme,
        lawyer: lawyerObj,
        client: clientObj,
        timeslot: {
            start: timeslot.start,
            end: timeslot.end,
            isFree: timeslot.isFree,
        },
    };
};
