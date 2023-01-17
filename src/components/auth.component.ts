import passport from "passport";
import jwt from "jsonwebtoken";
import { UserClass, UserModel } from "src/models/User";
import { config } from "src/config";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { ObjectId } from "mongodb";
import { UserRole } from "src/types.index";
import { ClientModel } from "src/models/Client";
import { LawyerModel } from "src/models/Lawyer";

import { BeAnObject, DocumentType } from "@typegoose/typegoose/lib/types";

export const logIn = async (
    phone: number,
    password: string,
    role: UserRole
) => {
    let user: DocumentType<UserClass, BeAnObject>;
    if (role == UserRole.Client) {
        user = await ClientModel.findOne({
            where: { phone: phone },
        });
    } else if (role == UserRole.Lawyer) {
        user = await LawyerModel.findOne({
            where: { phone: phone },
        });
    } else {
        throw new Error("invalid_role");
    }

    if (!user) {
        throw new Error("invalid_phone");
    }

    if (!user.check_passwrord(password)) {
        throw new Error("invalid_password");
    }

    return jwt.sign(
        {
            _id: user._id,
            role: role,
        },
        config.JWT_SECRET,
        { expiresIn: "1h" }
    );
};

export const jwtStrategy = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.JWT_SECRET,
    },
    (jwt_payload, done) => {
        if (jwt_payload.role == UserRole.Client) {
            ClientModel.findOne(
                { _id: new ObjectId(jwt_payload._id) },
                (err: Error, user: UserClass) => {
                    if (err) {
                        return done(err, false);
                    } else if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                }
            );
        } else if (jwt_payload.role == UserRole.Lawyer) {
            LawyerModel.findOne(
                { _id: new ObjectId(jwt_payload._id) },
                (err: Error, user: UserClass) => {
                    if (err) {
                        return done(err, false);
                    } else if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                }
            );
        } else {
            return done(null, false);
        }
    }
);

export const verifyUser = passport.authenticate("jwt", { session: false });
