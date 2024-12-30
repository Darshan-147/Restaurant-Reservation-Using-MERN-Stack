import express from "express";
import send_reservation from "../controller/reservation.js";
import { Reservation } from "../models/reservationSchema.js";

const router = express.Router();

router.post("/send", send_reservation);

router.get("/availability", async (req, res) => {
  try {
    console.log("Received query params:", req.query);
    const { date, time } = req.query; // Extract date and time from query parameters

    if (!date || !time) {
      return res.status(400).json({ message: "Date and time are required." });
    }

    const TOTAL_SEATS = 100;

    // Normalize date if needed (assuming database stores ISO date format)
    const normalizedDate = new Date(date.split("-").reverse().join("-")).toISOString().split("T")[0];

    const totalReservations = await Reservation.countDocuments({ date: normalizedDate, time }); // Use date and time in query
    console.log("Total Reservations:", totalReservations);

    const availableSeats = TOTAL_SEATS - totalReservations;
    res.status(200).json({ availableSeats });
  } catch (error) {
    console.error("Error fetching seat availability:", error.message); // Log error details
    res.status(500).json({ message: "Failed to fetch seat availability." });
  }
});

export default router;
