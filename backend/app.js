import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";
import { Reservation } from "./models/reservationSchema.js";

const app = express();
dotenv.config({ path: "../.env" });

app.use(
  cors({
    origin: "https://restaurant-reservation-using-mern-stack.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);
app.get("/", async (req, res, next) => {
  try {
    const users = await Reservation.find(); // Query to get all users
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error); // Pass any errors to the error middleware
  }
});

dbConnection();

app.use(errorMiddleware);

export default app;
