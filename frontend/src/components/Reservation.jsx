import React, { useState, useEffect } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const [firstName, setFirstName] = useState("Darshan");
  const [lastName, setLastName] = useState("Soni");
  const [email, setEmail] = useState("darshan1233@gmail.com");
  const [date, setDate] = useState("26-05-2025");
  const [time, setTime] = useState("12:00");
  const [phone, setPhone] = useState("1234567890");
  const [availableSeats, setAvailableSeats] = useState(100); // Default seat count
  const [message, setMessage] = useState("");
  const [isPrivate, setIsPrivate] = useState(false); // For private bookings
  const navigate = useNavigate();

  // Fetch seat availability on component mount
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        console.log(firstName);
        const { data } = await axios.get("/api/v1/reservation/availability", {
          params: { firstName }, // Pass date and time as query parameters
        });
        setAvailableSeats(data.availableSeats);
        updateMessage(data.availableSeats);
      } catch (error) {
        toast.error("Failed to fetch seat availability");
      }
    };
  
    fetchSeats();
  }, [availableSeats, firstName]); // Add date and time as dependencies if they're dynamic
  

  // Update seat message
  const updateMessage = (availableSeats) => {
    if (availableSeats <= 40) {
      setMessage(`Hurry! Only ${availableSeats} seats are left!`);
    } else {
      setMessage(`${availableSeats} seats available.`);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setDate("");
    setTime("");
    setPhone("");
    setIsPrivate(false);
  };

  // Validate input fields
  const validateInputs = () => {
    if (!firstName.trim()) {
      toast.error("First name is required.");
      return false;
    }
    if (firstName.trim().length < 2) {
      toast.error("First name should be at least 2 characters.");
      return false;
    }
    if (!lastName.trim()) {
      toast.error("Last name is required.");
      return false;
    }
    if (lastName.trim().length < 2) {
      toast.error("Last name should be at least 2 characters.");
      return false;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email.");
      return false;
    }
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }

    const reservationDate = new Date(date.trim());
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(reservationDate)) {
      toast.error("Reservation date is required.");
      return false;
    }

    if (reservationDate < today) {
      toast.error("Please enter a valid reservation date.");
      return false;
    }

    if (!time.trim()) {
      toast.error("Reservation time is required.");
      return false;
    }
    return true;
  };

  // Handle reservation submission
  const handleReservation = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const { data } = await axios.post(
        "/api/v1/reservation/send",
        { firstName, lastName, email, phone, date, time, isPrivate },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setAvailableSeats(data.availableSeats); // Update seat count
      updateMessage(data.availableSeats);
      resetForm();
      navigate("/success");
    } catch (error) {
      toast.error("Error submitting reservation");
    }
  };

  return (
    <section className="reservation" id="reservation">
      <div className="container">
        <div className="banner">
          <img src="/reservation.png" alt="Reservation Banner" />
        </div>
        <div className="banner">
          <div className="reservation_form_box">
            <h1>MAKE A RESERVATION</h1>
            <p>For queries, feel free to reach out to us.</p>
            <form>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="date"
                  placeholder="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <input
                  type="time"
                  placeholder="Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="privateBooking">
                <input
                  type="checkbox"
                  id="privateBooking"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
                <label htmlFor="privateBooking">Private Booking</label>
              </div>
              <button type="submit" onClick={handleReservation}>
                RESERVE NOW{" "}
                <span>
                  <HiOutlineArrowRight />
                </span>
              </button>
            </form>
            <p></p>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
