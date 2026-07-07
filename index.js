import express from "express";
import dotenv from "dotenv";
import UserRouter from "./src/routes/user.Route.js";
import FieldRouter from "./src/routes/field.route.js";
import BookingRouter from "./src/routes/booking.route.js";
import connectMongo from "./src/config/mongo.js";
import cors from "cors";
import path from "path";

dotenv.config();
connectMongo();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

app.use("/api/users", UserRouter);
app.use("/api/fields", FieldRouter);
app.use("/api/bookings", BookingRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
