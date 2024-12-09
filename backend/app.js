import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";
import { Reservation } from "./models/reservationSchema.js";

const app = express();
dotenv.config({ path: "./config.env" });

// Connect to the database
dbConnection();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/reservation", reservationRouter);


app.get("/", async (req, res, next) => {
  try {
    const reservations = await Reservation.find(); // Query to get all reservations
    res.status(200).json({
      success: true,
      data: reservations,
    });
  } catch (error) {
    next(error); // Pass any errors to the error middleware
  }
});

// Error handling middleware
app.use(errorMiddleware);

export default app;
