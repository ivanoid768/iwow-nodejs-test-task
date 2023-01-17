import {
    getModelForClass,
    pre,
    prop,
    DocumentType,
    index,
} from "@typegoose/typegoose";
import { hash, compare } from "bcrypt";
import { ObjectId } from "mongoose";
import { passwordRegexp, phoneRegexp } from "src/common.index";

@pre<UserClass>("save", async function () {
    let hashed_password = await hash(this.password, 10);

    this.password = hashed_password;
})
export class UserClass {
    @prop({
        required: true,
        maxlength: 100,
    })
    public name!: string;

    @prop({
        required: true,
        maxlength: 100,
    })
    public lastname!: string;

    @prop({
        required: false,
        maxlength: 100,
    })
    public patronymic?: string;

    @prop({
        required: true,
        match: phoneRegexp,
    })
    public phone!: string;

    @prop({
        required: true,
        match: passwordRegexp,
    })
    public password!: string;

    public async check_passwrord(
        this: DocumentType<UserClass>,
        password: string
    ) {
        return compare(password, this.password);
    }

    public getFullName() {
        return `${this.lastname} ${this.name}`;
    }
}

export const UserModel = getModelForClass(UserClass);
