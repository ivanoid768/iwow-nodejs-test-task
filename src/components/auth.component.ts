import passport from "passport";
import jwt from "jsonwebtoken";
import { UserClass, UserModel } from "src/models/User";
import { config } from "src/config";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { ObjectId } from "mongodb";

export const logIn = async (phone: number, password: string) => {
    const user = await UserModel.findOne({ where: { phone: phone } });

    if (!user) {
        throw new Error("invalid_phone");
    }

    if (!user.check_passwrord(password)) {
        throw new Error("invalid_password");
    }

    return jwt.sign(
        {
            _id: user._id,
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
        UserModel.findOne(
            { _id: new ObjectId(jwt_payload._id) },
            (err: Error, user: UserClass) => {
                if (err) {
                    return done(err, false);
                }
                else if (user) {                    
                    return done(null, user);
                }
                else {
                    return done(null, false);
                }
            }
        );
    }
);

export const verifyUser = passport.authenticate("jwt", { session: false });
