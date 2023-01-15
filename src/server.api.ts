import express, { json } from "express";
import session from "express-session";
import passport from "passport";
import createMemoryStore from "memorystore";
import { config } from "./config";
import { UserClass, UserModel } from "./models/User";
import { authRouter, lawyerRouter } from "./routers/index.router";
import { jwtStrategy, verifyUser } from "./components/auth.component";

const app = express();

app.use(json());

// const MemoryStore = createMemoryStore(session);

// const sessionMiddleware = session({
//     store: new MemoryStore({
//         checkPeriod: 86400000, // prune expired entries every 24h
//     }),
//     secret: config.SESSION_SECRET,
//     resave: true,
//     rolling: true,
//     saveUninitialized: false,
// });

// app.use(sessionMiddleware);

// passport.serializeUser(async (user: UserClass) => {
//     return user.id;
// });

// passport.deserializeUser(async (id: number) => {
//     const user = await UserModel.findOne({ where: { id } });

//     return user;
// });
passport.use(jwtStrategy);

app.use(passport.initialize());
// app.use(passport.session());

app.use("/auth", authRouter);
app.use("/lawyer", verifyUser, lawyerRouter);

const port = 8080;

export const startServer = async () => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
};
