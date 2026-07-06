import express from "express";
import { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking } from "../controller/booking.controller.js";
const BookingRouter = express.Router();

BookingRouter.post("/create_booking", createBooking);
BookingRouter.get("/all_bookings", getAllBookings);
BookingRouter.get("/booking/:id", getBookingById);
BookingRouter.put("/update_booking/:id", updateBooking);
BookingRouter.delete("/delete_booking/:id", deleteBooking);

export default BookingRouter;