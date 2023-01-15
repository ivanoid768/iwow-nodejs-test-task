import {
    getModelForClass,
    pre,
    prop,
    DocumentType,
} from "@typegoose/typegoose";
import { hash, compare } from "bcrypt";
import { ObjectId } from "mongoose";

@pre<UserClass>("save", async function () {
    let hashed_password = await hash(this.password, 10);

    this.password = hashed_password;
})
export class UserClass {
    @prop()
    public _id!: ObjectId;

    @prop({
        required: true,
    })
    public name!: string;

    @prop({
        required: true,
    })
    public lastname!: string;

    @prop()
    public patronymic?: string;

    @prop({
        unique: true,
        required: true,
    })
    public phone!: number;

    @prop({
        required: true,
    })
    public password!: string;

    public async check_passwrord(
        this: DocumentType<UserClass>,
        password: string
    ) {
        return compare(password, this.password);
    }
}

export const UserModel = getModelForClass(UserClass);
