import express, { json } from "express";
import session from "express-session";
import passport from "passport";
import { ObjectId } from "mongodb";
import createMemoryStore from "memorystore";
import { config } from "./config";
import { UserClass, UserModel } from "./models/User";
import { authRouter, lawyerRouter } from "./routers/index.router";
import { jwtStrategy, verifyUser } from "./components/auth.component";

const app = express();
app.use(json());

passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/auth", authRouter);
app.use("/lawyer", verifyUser, lawyerRouter);

const port = 8080;

export const startServer = async () => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};
