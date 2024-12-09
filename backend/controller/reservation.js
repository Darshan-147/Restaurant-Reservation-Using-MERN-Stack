import ErrorHandler from "../middlewares/error.js";
import { Reservation } from "../models/reservationSchema.js";

// Sample total capacity
const TOTAL_SEATS = 100;

const send_reservation = async (req, res, next) => {
  console.log(req.body);
  const { firstName, lastName, email, date, time, phone, isPrivate } = req.body;

  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
  }

  try {
    // Check available seats
    const totalReservations = await Reservation.countDocuments({
      date,
      time,
    });
    const availableSeats = TOTAL_SEATS - totalReservations;

    if (availableSeats <= 0) {
      return next(
        new ErrorHandler("No seats available for the selected time!", 400)
      );
    }

    // Handle private booking
    if (isPrivate && availableSeats < TOTAL_SEATS) {
      return next(
        new ErrorHandler(
          "Private booking cannot be made as some seats are already reserved!",
          400
        )
      );
    }

    // Create a reservation
    await Reservation.create({
      firstName,
      lastName,
      email,
      date,
      time,
      phone,
      isPrivate,
    });

    // Return updated seat availability
    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
      availableSeats: isPrivate ? 0 : availableSeats - 1, // If private, block all seats
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }

    // Handle other errors
    return next(error);
  }
};

export default send_reservation;
