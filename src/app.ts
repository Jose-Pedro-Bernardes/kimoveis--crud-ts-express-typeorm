import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleErrors } from "./errors";
import usersRoutes from "./routes/users.route";
import loginRoute from "./routes/login.route";
import categoriesRoutes from "./routes/categories.route";
import realEstateRoutes from "./routes/realEstate.route";
import schedulesRoutes from "./routes/schedules.route";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRoute);
app.use("/categories", categoriesRoutes);
app.use("/realEstate", realEstateRoutes);
app.use("/schedules", schedulesRoutes);

app.use(handleErrors);

export default app;
