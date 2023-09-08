import Booking from "./Booking";

export default function Bookings({ bookings }) {
  return (
    bookings && bookings.map((booking) => <Booking key={booking.id} {...booking} />)
  );
}