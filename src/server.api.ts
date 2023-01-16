import express, { json } from "express";
import passport from "passport";
import { authRouter, consultationRouter, lawyerRouter, timeslotRouter } from "./routers/index.router";
import { jwtStrategy, verifyUser } from "./components/auth.component";

const app = express();
app.use(json());

passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("/auth", authRouter);
app.use("/lawyer", verifyUser, lawyerRouter);
app.use("/timeslot", verifyUser, timeslotRouter);
app.use("/consultation", verifyUser, consultationRouter);

const port = 8080;

export const startServer = async () => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};
