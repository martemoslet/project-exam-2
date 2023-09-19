export default function BookingOnYourVenue({ id, dateFrom, dateTo, guests }) {
  const convertDateFrom = new Date(dateFrom).toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
  });
  const convertDateTo = new Date(dateTo).toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
  });
  return (
    <>
      {convertDateFrom} - {convertDateTo}, Guests: {guests}
      <br></br>
    </>
  );
}
