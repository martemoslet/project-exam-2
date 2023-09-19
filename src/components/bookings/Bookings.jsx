import BookingOnYourVenue from "./BookingOnYourVenue";

export default function Bookings({ bookings }) {
  return (
    bookings &&
    bookings.map((booking) => (
      <BookingOnYourVenue key={booking.id} {...booking} />
    ))
  );
}
