import {
    getDiscriminatorModelForClass,
    getModelForClass,
    index,
} from "@typegoose/typegoose";
import { UserClass, UserModel } from "./User";

@index(
    { phone: 1 },
    { partialFilterExpression: { __t: { $eq: "ClientClass" } } }
)
export class ClientClass extends UserClass {}

export const ClientModel = getDiscriminatorModelForClass(
    UserModel,
    ClientClass
);
