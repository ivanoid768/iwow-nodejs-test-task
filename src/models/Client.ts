import { getModelForClass } from "@typegoose/typegoose";
import { UserClass } from "./User";

export class ClientClass extends UserClass {}

export const ClientModel = getModelForClass(ClientClass);
