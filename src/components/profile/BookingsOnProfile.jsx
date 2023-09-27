import { ProfileBookings } from "./Bookings";

export default function BookingsOnProfile({ bookings }) {
  return (
    <>
      {bookings &&
        bookings.length &&
        bookings.map((bookingData) => (
          <ProfileBookings key={bookingData.id} bookingData={bookingData} />
        ))}
    </>
  );
}
