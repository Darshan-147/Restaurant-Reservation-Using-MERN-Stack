import express from "express";
import send_reservation from "../controller/reservation.js";

const router = express.Router();

router.post("/send", send_reservation);

router.get("/availability", async (req, res) => {
    try {
      const availableSeats = 100;  
      res.status(200).json({ availableSeats });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch seat availability." });
    }
  });

export default router;
